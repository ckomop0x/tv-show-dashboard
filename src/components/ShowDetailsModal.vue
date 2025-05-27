<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';
import type { Show } from '@/types/show';
import Rating from '@/components/Rating.vue';

const props = defineProps<{
  show: Show;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function closeModal() {
  emit('close');
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    closeModal();
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown);
});

const statusClass = computed(() => {
  const status = props.show.status?.toLowerCase();
  return {
    'text-green-600': status === 'running',
    'text-gray-400': status === 'ended',
    'text-red-600': status === 'cancelled',
  };
});
</script>

<template>
  <div
    class="fixed inset-0 bg-black/80 flex items-center justify-center z-[1000] p-4"
    @click="closeModal"
  >
    <div
      class="bg-white rounded-sm w-full max-w-3xl max-h-[90vh] overflow-y-auto relative shadow-2xl"
      @click.stop
    >
      <button
        @click="closeModal"
        class="absolute top-4 right-4 hover:bg-black/10 w-10 h-10 rounded-full text-xl cursor-pointer z-10 transition"
      >
        ✕
      </button>

      <div class="p-8 max-[480px]:p-4">
        <div class="flex flex-col sm:flex-row gap-8 mb-8">
          <div class="flex-none w-full sm:w-[200px]">
            <img
              v-if="show.image?.medium"
              :src="show.image.medium"
              :alt="show.name"
              class="w-full h-auto rounded-sm sm:max-w-full max-w-[150px] mx-auto"
            />
            <span
              v-else
              class="flex items-center justify-center w-full h-full bg-indigo-200 text-indigo-700 text-xs font-semibold rounded-sm p-6"
            >
              <svg
                class="w-6 h-6 mr-2 opacity-60"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2"
                  stroke="currentColor"
                />
                <path
                  d="M3 17l5-5a2 2 0 0 1 2.8 0l5.2 5.2"
                  stroke="currentColor"
                />
                <circle cx="8.5" cy="9.5" r="1.5" fill="currentColor" />
              </svg>
              No image
            </span>
          </div>

          <div class="flex-1">
            <h1 class="text-2xl text-gray-800 mb-4 leading-tight font-bold">
              {{ show.name }}
            </h1>

            <div class="grid gap-2 mb-6">
              <div class="flex gap-2">
                <span class="font-semibold text-gray-600 min-w-[80px] text-sm"
                  >Rating:</span
                >
                <Rating :rating="show.rating.average" />
              </div>

              <div class="flex gap-2 items-center" v-if="show.status">
                <span class="font-semibold text-gray-600 min-w-[80px] text-sm"
                  >Status:</span
                >
                <span :class="statusClass">{{ show.status }}</span>
              </div>

              <div class="flex gap-2" v-if="show.premiered">
                <span class="font-semibold text-gray-600 min-w-[80px]"
                  >Premiered:</span
                >
                <span>{{ formatDate(show.premiered) }}</span>
              </div>

              <div class="flex gap-2" v-if="show.network?.name">
                <span class="font-semibold text-gray-600 min-w-[80px]"
                  >Network:</span
                >
                <span>{{ show.network.name }}</span>
              </div>

              <div class="flex gap-2" v-if="show.runtime">
                <span class="font-semibold text-gray-600 min-w-[80px]"
                  >Runtime:</span
                >
                <span>{{ show.runtime }} minutes</span>
              </div>
            </div>

            <div v-if="show.genres?.length">
              <h3 class="text-gray-800 mb-2 font-semibold">Genres</h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="genre in show.genres"
                  :key="genre"
                  class="text-gray-600 text-sm"
                >
                  {{ genre }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-8" v-if="show.summary">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Summary</h3>
          <div
            class="leading-relaxed text-gray-700"
            v-html="show.summary"
          ></div>
        </div>

        <div class="mb-8" v-if="show.schedule">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Schedule</h3>
          <p v-if="show.schedule.days?.length" class="text-gray-700 mb-2">
            <strong>Days:</strong> {{ show.schedule.days.join(', ') }}
          </p>
          <p v-if="show.schedule.time" class="text-gray-700">
            <strong>Time:</strong> {{ show.schedule.time }}
          </p>
        </div>

        <div class="mb-8" v-if="show.externals">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">
            External Links
          </h3>
          <div class="flex flex-col sm:flex-row gap-4">
            <a
              v-if="show.externals.imdb"
              :href="`https://www.imdb.com/title/${show.externals.imdb}`"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-amber-300 text-black px-6 py-3 rounded-sm font-bold hover:bg-amber-400"
            >
              IMDb
            </a>
            <a
              v-if="show.url"
              :href="show.url"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-indigo-500 text-white px-6 py-3 rounded-sm font-bold hover:bg-indigo-600"
            >
              TV Maze
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
