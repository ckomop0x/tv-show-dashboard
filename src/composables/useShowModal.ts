import { ref, computed } from 'vue';
import type { Show } from '@/types/Show';
import type { Router } from 'vue-router';

export function useShowModal(router: Router) {
  const selectedShow = ref<Show | undefined>(undefined);
  const modalOpen = ref(false);

  const showModal = computed(() => modalOpen.value && !!selectedShow.value);

  function openModal(show: Show) {
    selectedShow.value = show;
    modalOpen.value = true;
    void router.push(`/show/${show.id}`);
  }

  function closeModal() {
    selectedShow.value = undefined;
    modalOpen.value = false;
    void router.push('/');
  }

  return { selectedShow, modalOpen, showModal, openModal, closeModal };
}
