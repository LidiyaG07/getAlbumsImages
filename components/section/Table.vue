<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  albums: Array,
  isLoading: Boolean,
  sortKey: String,
  sortOrder: String,
});

const visibleCount = ref(30);
const loadMore = () => {
  visibleCount.value += 30;
};

const emit = defineEmits(["sort", "load-more"]);

const sentinel = ref(null);

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      emit("load-more");
    }
  });

  if (sentinel.value) {
    observer.observe(sentinel.value);
  }
});
</script>
<template>
  <div
    class="max-h-[600px] max-w-[600px] overflow-y-auto scrollbar-hide rounded-xl p-1"
  >
    <!-- Заголовки -->
    <div
      class="grid grid-cols-[50px_90px_1fr_200px_100px] sticky top-0 z-10 w-full gap-1 mb-1"
    >
      <div
        class="flex gap-1 p-2 border rounded-xl border-black dark:border-zinc-700 shadow-inner bg-zinc-100 dark:bg-zinc-900 dark:shadow-zinc-700 cursor-pointer"
        @click="emit('sort', 'id')"
      >
        Ид
        <span v-if="sortKey === 'title'"
          ><Icon
            :name="
              sortOrder === 'asc'
                ? 'line-md:arrow-small-down'
                : 'line-md:arrow-small-up'
            "
            width="15"
            height="15"
          />
        </span>
      </div>
      <div
        class="flex gap-1 p-2 border rounded-xl border-black dark:border-zinc-700 shadow-inner bg-zinc-100 dark:bg-zinc-900 dark:shadow-zinc-700"
        @click="emit('sort', 'albumId')"
      >
        Альбом
        <span v-if="sortKey === 'albumId'"
          ><Icon
            :name="
              sortOrder === 'asc'
                ? 'line-md:arrow-small-down'
                : 'line-md:arrow-small-up'
            "
            width="15"
            height="15"
          />
        </span>
      </div>
      <div
        class="p-2 border rounded-xl border-black dark:border-zinc-700 shadow-inner bg-zinc-100 dark:bg-zinc-900 dark:shadow-zinc-700"
        @click="emit('sort', 'title')"
      >
        Название
        <span v-if="sortKey === 'title'"
          ><Icon
            :name="
              sortOrder === 'asc'
                ? 'line-md:arrow-small-down'
                : 'line-md:arrow-small-up'
            "
            width="15"
            height="15"
          />
        </span>
      </div>
      <div
        class="p-2 border rounded-xl border-black dark:border-zinc-700 shadow-inner bg-zinc-100 dark:bg-zinc-900 dark:shadow-zinc-700"
      >
        Ссылка
      </div>
      <div
        class="p-2 border rounded-xl border-black dark:border-zinc-700 shadow-inner bg-zinc-100 dark:bg-zinc-900 dark:shadow-zinc-700"
      >
        Миниатюра
      </div>
    </div>

    <!-- Лоадер / скелетон -->
    <template v-if="isLoading">
      <div
        v-for="i in 10"
        :key="i"
        class="grid grid-cols-[50px_90px_1fr_200px_100px] animate-pulse gap-x-1 mb-1"
      >
        <div class="p-2 bg-gray-200 h-10 rounded-xl col-span-1"></div>
        <div class="p-2 bg-gray-200 h-10 rounded-xl col-span-1"></div>
        <div class="p-2 bg-gray-200 h-10 rounded-xl col-span-1"></div>
        <div class="p-2 bg-gray-200 h-10 rounded-xl col-span-1"></div>
        <div class="p-2 bg-gray-200 h-10 rounded-xl col-span-1"></div>
      </div>
    </template>

    <!-- Данные -->
    <template v-else>
      <div
        v-for="img in albums.slice(0, visibleCount)"
        :key="img.id"
        class="grid grid-cols-[50px_90px_1fr_200px_100px] w-full gap-x-1 gap-y-2 mb-1"
      >
        <div
          class="p-2 border rounded-xl border-black dark:border-zinc-700 shadow-inner dark:shadow-zinc-700"
        >
          {{ img.id }}
        </div>
        <div
          class="max-w-[300px] p-2 border rounded-xl border-black dark:border-zinc-700 shadow-inner dark:shadow-zinc-700 truncate"
          :title="img.albumId"
        >
          {{ img.albumId }}
        </div>
        <div
          class="max-w-[300px] p-2 border rounded-xl border-black dark:border-zinc-700 shadow-inner dark:shadow-zinc-700 truncate"
          :title="img.title"
        >
          {{ img.title }}
        </div>
        <div
          class="max-w-[300px] p-2 border rounded-xl border-black dark:border-zinc-700 shadow-inner dark:shadow-zinc-700 truncate"
          :title="img.url"
        >
          <a :href="img.url" target="_blank">{{ img.url }}</a>
        </div>
        <div
          class="flex justify-center p-2 border rounded-xl border-black dark:border-zinc-700 shadow-inner dark:shadow-zinc-700"
        >
          <img
            :src="img.thumbnailUrl"
            class="w-7 h-7 object-contain rounded-xl"
          />
        </div>
        <div ref="sentinel"></div>
      </div>
    </template>
  </div>
</template>