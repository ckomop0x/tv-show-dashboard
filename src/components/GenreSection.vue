<script setup lang="ts">
import ShowCard from './ShowCard.vue';
import type { Show } from '@/types/Show';

const { openModal, shows, genre } = defineProps<{
  genre: string;
  shows: any[];
  openModal: (show: Show) => void;
}>();
</script>
<template>
  <div class="mb-8" v-if="shows.length">
    <h2 class="text-2xl font-bold mb-4">{{ genre }}</h2>
    <div class="relative">
      <div
        class="grid gap-4 overflow-x-auto scroll-smooth py-2 grid-flow-col grid-cols-[repeat(auto-fill,_200px)]"
        ref="scrollContainer"
      >
        <ShowCard
          v-for="show in shows"
          :key="show.id"
          :show="show"
          @click="openModal"
          class="flex-none w-[200px] h-[280px]"
        />
      </div>
    </div>
  </div>
</template>
