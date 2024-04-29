<template>
  <div class="relative flex h-screen items-center justify-center">
    <div
      class="absolute h-full w-full bg-[radial-gradient(theme(colors.border/90%)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"
    />

    <div class="relative w-full max-w-[330px] px-5">
      <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">{{ title }}</h1>
      <p class="mt-1 text-muted-foreground">{{ description }}</p>

      <form class="mt-10" @submit="submit">
        <fieldset :disabled="isSubmitting" class="grid gap-5">
          <UiVeeInput
            required
            label="Email"
            type="email"
            name="email"
            placeholder="john@example.com"
          />
          <UiVeeInput required label="Password" type="password" name="password" />
          <ul class="flex flex-col gap-4">
            <li class="flex items-center gap-3 text-sm text-muted-foreground">
              <Icon
                :class="[meta.valid ? 'text-green-500' : '']"
                class="size-[18px]"
                name="lucide:check-circle-2"
              />
              <span>At least 8 characters</span>
            </li>
            <li class="flex items-center gap-3 text-sm text-muted-foreground">
              <Icon
                :class="[meta.valid ? 'text-green-500' : '']"
                class="size-[18px]"
                name="lucide:check-circle-2"
              />
              <span>At least 1 number & special character</span>
            </li>
          </ul>
          <UiButton class="w-full" type="submit" text="Log in" />
        </fieldset>
      </form>
      <p class="mt-8 text-sm text-muted-foreground">
        Don't have an account?
        <NuxtLink class="font-semibold text-primary underline-offset-2 hover:underline" to="/"
          >Create one</NuxtLink
        >
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";

  const title = "Log In";
  const description = "Enter your email and password to log in.";
  definePageMeta({
    middleware: "already-logged-in",
  });
  useSeoMeta({ title, description });

  const Schema = object({
    email: string().email().required().label("Email"),
    password: string()
      .required()
      .min(8)
      .label("Password")
      .test("password", "Password must contain at least 1 number & special character", (value) => {
        return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(value);
      }),
  });

  const { handleSubmit, isSubmitting, meta } = useForm({
    validationSchema: toTypedSchema(Schema),
  });

  const submit = handleSubmit(async (values) => {
    try {
      //  Call API to log in
      const res = await useStrapiClient()<any>("/auth/local", {
        method: "POST",
        body: {
          identifier: values.email,
          password: values.password,
        },
      });
      console.log(res);

      if (res.jwt) {
        //  Save the token
        useStrapiAuth().setToken(res.jwt);
        // fetch user
        await useStrapiAuth().fetchUser();
        useSonner.success("Welcome back", {
          description: "You have successfully logged in.",
        });
        //  Redirect to dashboard
        useRouter().go(0);
      } else {
        useSonner.success("Please check your email!", {
          description: "We sent a One-Time Password (OTP) to your email.",
        });
        // Redirect to OTP page
        return await navigateTo("/otp");
      }
    } catch (error: any) {
      useSonner.error("Failed to log in", {
        description: error.error.message,
      });
    }
  });
</script>
