<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {fetchAllShows, searchShows} from '@/services/tvmaze'
import { useDebounce } from '@/composables/useDebounce'
import FilmCard from '@/components/FilmCard.vue'
import type { Show } from '@/types/show'

const showsByGenre = ref<Record<string, Show[]>>({})
const searchQuery = ref('')
const filteredQuery = ref('')
const searchResults = ref<Show[]>([])

const handleSearch = async (value: string) => {
  if (value.trim().length < 2) {
    searchResults.value = []
    return
  }
  searchResults.value = await searchShows(value)
}

useDebounce(searchQuery, 300, (value: string) => {
  handleSearch(value)
})



const filteredBySearch = (shows: Show[]): Show[] => {
  if (!filteredQuery.value) return shows
  return shows.filter(show =>
      show.name.toLowerCase().includes(filteredQuery.value)
  )
}

onMounted(async () => {
  const allShows = await fetchAllShows()
  const genreMap: Record<string, Show[]> = {}

  allShows.forEach((show) => {
    show.genres.forEach((genre) => {
      if (!genreMap[genre]) genreMap[genre] = []
      genreMap[genre].push(show)
    })
  })

  for (const genre in genreMap) {
    genreMap[genre].sort((a, b) => (b.rating.average ?? 0) - (a.rating.average ?? 0))
  }

  showsByGenre.value = genreMap
})
</script>

<template>
  <div class="p-4 space-y-8">
    <div class="max-w-md">
      <input
          v-model="searchQuery"
          type="text"
          placeholder="Search TV shows..."
          class="border p-2 w-full rounded"
      />
    </div>

    <div v-if="searchResults.length > 0" class="space-y-4">
      <h2 class="text-xl font-bold mb-2">Search Results</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 py-2" v-horizontal-scroll>
        <FilmCard
            v-for="show in searchResults"
            :key="show.id"
            :show="show" />
      </div>
    </div>

    <template v-if="searchResults.length === 0">
      <template v-for="(shows, genre) in showsByGenre" :key="genre">
        <div v-if="filteredBySearch(shows).length">
          <h2 class="text-xl font-bold mb-2">{{ genre }}</h2>
          <div class="flex overflow-x-auto space-x-4 py-2 overflow-y-hidden" v-horizontal-scroll>
            <FilmCard
              v-for="show in filteredBySearch(shows)"
              :key="show.id"
              :show="show"
            />
          </div>
        </div>
      </template>
    </template>
  </div>
</template>
