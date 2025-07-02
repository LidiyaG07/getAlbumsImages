<script setup>
import { ref } from "vue";
import { useImagesStore } from "~/stores/useImagesStore";
import { useSortData } from "~/stores/useSortData";

const imageStore = useImagesStore();
const sortStore = useSortData();

const limit = ref(30);
const handleLoadMore = () => {
  if (limit.value < imageStore.data.length) {
    limit.value += 30;
  }
};
</script>

<template>
  <div>
    <SectionTable
      :albums="sortStore.sortData(imageStore.data)"
      :isLoading="imageStore.isLoading"
      :sortKey="sortStore.sortKey"
      :sortOrder="sortStore.sortOrder"
      @sort="sortStore.setSortKey"
      @load-more="handleLoadMore"
    />
  </div>
</template>