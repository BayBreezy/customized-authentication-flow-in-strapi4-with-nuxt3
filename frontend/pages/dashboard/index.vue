<template>
  <UiContainer>
    <h1 class="mb-10 text-3xl font-bold">Welcome</h1>
    <UiButton @click="logout">Logout</UiButton>
  </UiContainer>
</template>

<script lang="ts" setup>
  definePageMeta({ middleware: "auth" });

  const logout = () => {
    useStrapiAuth().logout();
    useRouter().go(0);
  };
</script>
