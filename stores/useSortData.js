import { defineStore } from "pinia";
import { ref } from "vue";

export const useSortData = defineStore("sort", () => {
  const sortKey = ref(null);
  const sortOrder = ref("asc");

  const sortData = (data) => {
    if (!sortKey.value) return data;

    return [...data].sort((a, b) => {
      const aVal = a[sortKey.value];
      const bVal = b[sortKey.value];

      if (typeof aVal === "string") {
        return sortOrder.value === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.value.localeCompare(aVal);
      }

      return sortOrder.value === "asc" ? aVal - bVal : bVal - aVal;
    });
  };

  const setSortKey = (key) => {
    if (sortKey.value === key) {
      sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
    } else {
      sortKey.value = key;
      sortOrder.value = "asc";
    }
  };

  return { sortKey, sortOrder, sortData, setSortKey };
});
