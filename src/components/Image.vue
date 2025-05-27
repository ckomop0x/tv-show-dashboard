<script setup lang="ts">
const { url, alt } = defineProps<{
  url?: string;
  alt?: string;
}>();
</script>

<template>
  <img
    v-if="url"
    :src="url"
    :alt="alt"
    :title="alt"
    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
  /><span
    v-else
    class="flex items-center justify-center w-full h-full bg-indigo-200 text-indigo-700 text-xs font-semibold"
  >
    <svg
      class="w-6 h-6 mr-2 opacity-60"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      viewBox="0 0 24 24"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" />
      <path d="M3 17l5-5a2 2 0 0 1 2.8 0l5.2 5.2" stroke="currentColor" />
      <circle cx="8.5" cy="9.5" r="1.5" fill="currentColor" />
    </svg>
    No image
  </span>
</template>
