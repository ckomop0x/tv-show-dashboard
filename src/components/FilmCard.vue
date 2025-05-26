<script setup lang="ts">
import { defineProps } from 'vue'
import type { Show } from '@/types/show'

const props = defineProps<{
  show: Show
}>()
</script>

<template>
  <router-link
      :to="`/show/${show.id}`"
      class="min-w-[160px] bg-white rounded-lg shadow p-2 hover:scale-105 transition"
  >
    <div class="w-full h-40 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
      <img
          v-if="show.image?.medium"
          :src="show.image.medium"
          :alt="show.name"
          :title="show.name"
          class="w-full h-full object-cover"
      />
      <span v-else class="text-xs text-gray-500 px-2 text-center">No image</span>
    </div>
    <h3 class="text-sm mt-2 font-medium truncate">{{ show.name }}</h3>
    <p class="text-xs text-gray-500">Rating: {{ show.rating.average ?? 'N/A' }}</p>
  </router-link>
</template>
