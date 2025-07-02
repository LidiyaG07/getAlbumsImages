<script setup>
import { ref, onMounted, watch } from "vue";
import { useImagesStore } from "@/stores/useImagesStore";

const props = defineProps({
  isLoading: Boolean,
});

const store = useImagesStore();
const query = ref("");

onMounted(() => {
  const saved = localStorage.getItem("albumIds");
  if (saved) {
    query.value = saved;
    store.fetchImages(saved);
  }
});

watch(query, (newVal) => {
  if (process.client) {
    localStorage.setItem("albumIds", newVal);
  }
});

const handleSearch = () => {
  if (!query.value.trim()) return;
  store.fetchImages(query.value);
};
</script>
<template>
  <div class="max-w-2xl w-full mx-auto">
    <form @submit.prevent="handleSearch" class="w-full">
      <label
        for="search"
        class="min-w-[600px] flex justify-between items-center w-full gap-3"
      >
        <div
          class="w-full flex gap-2 rounded-3xl dark:bg-zinc-700 py-1 px-3 border border-black text-black dark:text-white transition-colors duration-500 hover:border-zinc-100 hover:shadow-2xl hover:shadow-zinc-100 focus-within:ring-2 focus-within:ring-blue-400"
        >
          <input
            id="search"
            v-model="query"
            type="search"
            placeholder="Найти альбом...1 2 3"
            autocomplete="off"
            class="w-full dark:bg-zinc-700 py-1 px-3 text-black dark:text-white transition-colors duration-500 placeholder:text-black placeholder:dark:text-zinc-500 focus:outline-none focus:ring-0 focus:border-transparent"
          /><span v-if="isLoading"
            ><Icon name="line-md:loading-loop" width="24" height="24"
          /></span>
        </div>
        <button
          type="submit"
          :disabled="isLoading"
          class="text-black dark:text-white transition-colors duration-500 focus:animate-bounce"
        >
          Найти
        </button>
      </label>
    </form>

    <div v-if="error">{{ error.message }}</div>
  </div>
</template>