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
          <UiVeeInput required label="One Time Password (OTP)" name="otp" />
          <UiButton class="w-full" type="submit" text="Verify OTP" />
        </fieldset>
      </form>
      <p class="mt-8 text-sm text-muted-foreground">
        Go back to
        <NuxtLink class="font-semibold text-primary underline-offset-2 hover:underline" to="/login"
          >Login page</NuxtLink
        >
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";

  const title = "One Time Password";
  const description = "Enter the One-Time Password (OTP)";

  definePageMeta({
    middleware: "already-logged-in",
  });

  useSeoMeta({ title, description });

  const Schema = object({
    otp: string().required().label("OTP"),
  });

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(Schema),
  });

  const submit = handleSubmit(async (values) => {
    try {
      // Call API to th verify OTP
      const res = await useStrapiClient()<{ jwt: string }>("/auth/otp", {
        method: "POST",
        body: {
          otp: values.otp,
        },
      });
      if (!res.jwt) return;
      //  Save the token
      useStrapiAuth().setToken(res.jwt);
      // fetch user
      await useStrapiAuth().fetchUser();
      useSonner.success("Welcome back", {
        description: "You have successfully logged in.",
      });
      //  Redirect to dashboard
      useRouter().go(0);
    } catch (error: any) {
      useSonner.error("Invalid Credentials", {
        description: error.error.message,
      });
    }
  });
</script>
