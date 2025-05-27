<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchAllShows, fetchShowById, searchShows } from '@/services/tvmaze';
import type { Show } from '@/types/Show';
import ShowDetailsModal from '@/components/ShowDetailsModal.vue';
import GenreSection from '@/components/GenreSection.vue';
import SearchBar from '@/components/SearchBar.vue';
import { useShowModal } from '@/composables/useShowModal';

const showsByGenre = ref<Record<string, Show[]>>({});
const searchResults = ref<Show[]>([]);
const route = useRoute();
const router = useRouter();

const { selectedShow, modalOpen, showModal, openModal, closeModal } =
  useShowModal(router);

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
      void router.push(`/show/${show.id}`);
      openModal(show);
    } catch (err) {
      selectedShow.value = undefined;
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
      <GenreSection
        :shows="searchResults"
        genre="Search Results"
        :openModal="openModal"
      />
    </div>

    <div v-for="(shows, genre) in showsByGenre" :key="genre">
      <GenreSection :shows="shows" :genre="genre" :openModal="openModal" />
    </div>

    <ShowDetailsModal
      v-if="showModal && selectedShow"
      :show="selectedShow"
      @close="closeModal"
    />
  </div>
</template>
