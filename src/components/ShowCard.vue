<script setup lang="ts">
import type { Show } from '@/types/show';
import Image from '@/components/Image.vue';
import Rating from '@/components/Rating.vue';

const props = defineProps<{
  show: Show;
  onClick: (show: Show) => void;
}>();
</script>

<template>
  <div
    class="bg-white rounded-sm overflow-hidden shadow-xs hover:shadow-md transition transform hover:-translate-y-1 group cursor-pointer flex flex-col h-full"
    @click="onClick(show)"
  >
    <div class="relative w-full h-[200px] overflow-hidden">
      <Image :url="props.show?.image?.medium" :alt="props.show.name" />
    </div>

    <div class="p-4 flex flex-col gap-2 flex-1">
      <div class="flex items-start justify-between">
        <h3
          class="text-sm font-bold text-gray-800 leading-snug line-clamp-2"
          :title="show.name"
        >
          {{ show.name }}
        </h3>
        <div
          :title="`Average rating ${show.rating?.average ? show.rating.average.toFixed(1) : '-'}`"
        >
          <Rating :rating="show.rating.average" />
        </div>
      </div>
      <div v-if="show.genres?.length" class="flex gap-2 flex-wrap">
        <span
          v-for="genre in show.genres.slice(0, 2)"
          :key="genre"
          class="text-gray-600 rounded-sm text-xs"
        >
          {{ genre }}
        </span>
      </div>
    </div>
  </div>
</template>
