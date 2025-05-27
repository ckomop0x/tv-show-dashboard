<script setup lang="ts">
import { computed } from 'vue';
import StarIcon from '../assets/star.svg';

const { rating } = defineProps<{
  rating?: number | null;
}>();

const ratingText = computed(() => {
  if (typeof rating !== 'number' && !rating) return '-';
  return rating.toFixed(1);
});
</script>

<template>
  <div
    class="flex gap-1 items-center text-xs font-bold text-gray-400 shrink-0 justify-center"
    :title="`Average rating ${ratingText}`"
  >
    <span class="text-amber-400">
      <StarIcon width="16" height="16" />
    </span>
    <span class="text-gray-600 font-semibold"> {{ ratingText }} </span>
  </div>
</template>
