<template>
  <div>
    <ConfigProvider :use-id="useIdFunction">
      <NuxtLoadingIndicator />
      <NuxtPage />
      <UiVueSonner />
    </ConfigProvider>
  </div>
</template>

<script setup lang="ts">
  import { ConfigProvider } from "radix-vue";

  const useIdFunction = () => useId();
</script>
