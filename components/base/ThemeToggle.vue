<script setup>
const themeStore = useThemeStore();
</script>

<template>
  <button
    @click="themeStore.toggleTheme"
    class="relative w-14 h-8 flex items-center rounded-full transition-colors duration-300 focus:outline-none bg-gray-300 dark:bg-zinc-700"
  >
    <!-- Круг -->
    <span
      class="w-6 h-6 bg-white dark:bg-black rounded-full shadow-md transform transition-transform duration-300 translate-x-1 dark:translate-x-7"
    >
      <!-- Иконки внутри (солнце/луна) -->
      <icon
        :name="themeStore.mode === 'dark' ? 'heroicons:sun' : 'heroicons:moon'"
    /></span>
  </button>
</template>
