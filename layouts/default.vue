<script setup>
</script>
<template>
  <LayoutHeader />
  <main
    class="min-h-screen flex flex-col items-center justify-start pt-10 transition-colors duration-500 dark:bg-black dark:text-white"
  >
    <slot />
  </main>
  <LayoutFooter />
</template>