<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { fetchShowById } from '@/services/tvmaze'
import type { Show } from '@/types/show'

const route = useRoute()
const show = ref<Show | null>(null)
const notFound = ref(false)

onMounted(async () => {
  try {
    const id = route.params.id
    if (id) {
      show.value = await fetchShowById(id.toString())
    }
  } catch (error) {
    notFound.value = true
  }
})
</script>

<template>
  <div class="p-4 max-w-3xl mx-auto">
    <router-link
        to="/"
        class="inline-block mb-4 text-sm text-blue-600 hover:underline"
    >
      ← Back to Dashboard
    </router-link>

    <div v-if="notFound" class="text-red-500">
      Show not found. <router-link to="/" class="underline">Go back</router-link>
    </div>

    <div v-else-if="show">
      <h1 class="text-2xl font-bold mb-4">{{ show.name }}</h1>
      <img :src="show.image?.original" class="w-full rounded mb-4" />
      <p class="text-gray-700" v-html="show.summary" />
      <p class="text-sm text-gray-500 mt-2">Rating: {{ show.rating.average ?? 'N/A' }}</p>
      <p class="text-sm text-gray-500">Genres: {{ show.genres.join(', ') }}</p>
    </div>
  </div>
</template>
