<script setup>
const themeStore = useThemeStore();
onMounted(() => {
  themeStore.initTheme();
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
