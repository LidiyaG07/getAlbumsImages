import { defineStore } from "pinia";
import { ref } from "vue";

// Создаю экспортную функцию
export const useImagesStore = defineStore("images", () => {
  const data = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  // Создаю запрос и ошибку в случае ошибки
  const fetchImages = async (albumQuery = null) => {
    isLoading.value = true;
    error.value = null;

    try {
      let url = "https://jsonplaceholder.typicode.com/photos";
      if (albumQuery) {
        const ids = albumQuery
          .split(" ")
          .map((id) => id.trim())
          .filter(Boolean);

        const params = new URLSearchParams();
        ids.forEach((id) => params.append("albumId", id));
        url += `?${params.toString()}`;
      }
      console.log("url", url);

      const res = await fetch(url);
      if (!res.ok) throw new Error("Ошибка загрузки данных, статус:");
      data.value = await res.json();
    } catch (err) {
      error.value = err;
    } finally {
      isLoading.value = false;
    }
  };

  // Первый запуск - загружаем все фото
  fetchImages();

  // возвращаем данные
  return {
    data,
    fetchImages,
    isLoading,
    error,
  };
});
