<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchAllShows, fetchShowById, searchShows } from '@/services/tvmaze';
import type { Show } from '@/types/show';
import ShowDetailsModal from '@/components/ShowDetailsModal.vue';
import GenreSection from '@/components/GenreSection.vue';
import SearchBar from '@/components/SearchBar.vue';
import ShowCard from '@/components/ShowCard.vue';

const showsByGenre = ref<Record<string, Show[]>>({});
const searchResults = ref<Show[]>([]);
const selectedShow = ref<Show | null>(null);
const modalOpen = ref(false);

const route = useRoute();
const router = useRouter();

const openModal = (show: Show): void => {
  selectedShow.value = show;
  modalOpen.value = true;
  router.push(`/show/${show.id}`);
};

const closeModal = (): void => {
  selectedShow.value = null;
  modalOpen.value = false;
  router.push('/');
};

const handleSearch = async (query: string) => {
  if (query.trim().length < 2) {
    searchResults.value = [];
    return;
  }
  searchResults.value = await searchShows(query);
};

const checkRouteAndOpenModal = async () => {
  if (route.params.id) {
    try {
      const show = await fetchShowById(route.params.id.toString());
      openModal(show);
    } catch (err) {
      selectedShow.value = null;
      modalOpen.value = false;
    }
  } else {
    closeModal();
  }
};

watch(modalOpen, open => {
  document.body.classList.toggle('overflow-hidden', open);
});

watch(() => route.fullPath, checkRouteAndOpenModal);

onMounted(async () => {
  const allShows = await fetchAllShows();
  const genreMap: Record<string, Show[]> = {};

  allShows.forEach(show => {
    show.genres.forEach(genre => {
      if (!genreMap[genre]) genreMap[genre] = [];
      genreMap[genre].push(show);
    });
  });

  for (const genre in genreMap) {
    genreMap[genre].sort(
      (a, b) => (b.rating.average ?? 0) - (a.rating.average ?? 0),
    );
  }

  showsByGenre.value = genreMap;

  if (route.params.id) {
    try {
      const show = await fetchShowById(route.params.id.toString());
      openModal(show);
    } catch (err) {
      console.warn('Invalid show ID');
    }
  }
});
</script>

<template>
  <header
    class="sticky top-0 z-[100] bg-indigo-500 backdrop-blur shadow-md py-4"
  >
    <div class="mx-auto px-4 flex items-center justify-between gap-8">
      <h1 class="text-2xl font-bold text-white whitespace-nowrap">
        TV Dashboard
      </h1>
      <div>
        <SearchBar :loading="false" @search="handleSearch" />
      </div>
    </div>
  </header>
  <div class="p-4 mx-auto mt-8">
    <div v-if="searchResults.length > 0">
      <h2 class="text-2xl font-bold mb-4">Search Results</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
        <ShowCard
          v-for="show in searchResults"
          :key="show.id"
          :show="show"
          :onClick="openModal"
        />
      </div>
    </div>

    <template v-if="searchResults.length === 0">
      <div v-for="(shows, genre) in showsByGenre" :key="genre">
        <GenreSection :shows="shows" :genre="genre" :openModal="openModal" />
      </div>
    </template>

    <ShowDetailsModal
      v-if="modalOpen"
      :show="selectedShow"
      @close="closeModal"
    />
  </div>
</template>
