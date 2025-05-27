<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  rating?: string | number;
}>();

const ratingText = computed(() => {
  if (typeof props.rating !== 'number' && !props.rating) return '-';
  const num = Number(props.rating);
  return isNaN(num) ? '-' : num.toFixed(1);
});
</script>

<template>
  <div
    class="flex gap-1 items-center text-xs font-bold text-gray-400 shrink-0 justify-center"
    :title="`Average rating ${ratingText}`"
  >
    <span class="text-amber-400">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="w-5 h-5"
      >
        <path
          fill="currentColor"
          d="M12 2l2.92 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l7.08-1.01L12 2z"
        />
      </svg>
    </span>

    <span class="text-gray-600 font-semibold"> {{ ratingText }} </span>
  </div>
</template>
