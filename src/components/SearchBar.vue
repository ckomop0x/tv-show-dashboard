<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue';

const props = defineProps<{
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: 'search', value: string): void;
}>();

const searchInput = ref('');
let searchTimeout: ReturnType<typeof setTimeout> | null = null;

const handleInput = () => {
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    emit('search', searchInput.value.trim());
  }, 300);
};

const handleSearch = () => {
  if (searchTimeout) clearTimeout(searchTimeout);
  emit('search', searchInput.value.trim());
};

const clearSearch = () => {
  searchInput.value = '';
  emit('search', '');
};

onBeforeUnmount(() => {
  if (searchTimeout) clearTimeout(searchTimeout);
});
</script>

<template>
  <div class="flex items-center gap-2 w-full max-w-[400px] relative">
    <div class="flex flex-1 bg-white rounded-sm overflow-hidden shadow-md">
      <input
        v-model="searchInput"
        @input="handleInput"
        @keyup.enter="handleSearch"
        type="text"
        placeholder="Search TV shows..."
        class="flex-1 pl-4 pr-8 py-2 text-base bg-transparent outline-none disabled:opacity-60 disabled:cursor-not-allowed placeholder:text-gray-400"
        :disabled="props.loading"
      />
    </div>
    <button
      v-if="searchInput"
      @click="clearSearch"
      class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/30 text-indigo-500 text-sm transition absolute right-0 cursor-pointer"
    >
      ✕
    </button>
  </div>
</template>
