import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import ShowCard from '@/components/ShowCard.vue';
import type { Show } from '@/types/Show';

const sampleShow: Show = {
  id: 1,
  name: 'Test Show',
  image: {
    medium: 'http://example.com/image.jpg',
  },
  rating: {
    average: 8.2,
  },
  genres: ['Drama', 'Action'],
  // add any other required fields here
} as Show;

describe('ShowCard.vue', () => {
  it('renders show name, image and rating', () => {
    const wrapper = mount(ShowCard, {
      props: {
        show: sampleShow,
        onClick: vi.fn(),
      },
    });

    expect(wrapper.text()).toContain('Test Show');
    expect(wrapper.html()).toContain('http://example.com/image.jpg');
    expect(wrapper.text()).toContain('Drama');
    expect(wrapper.text()).toContain('Action');
  });

  it('calls onClick with show on click', async () => {
    const onClick = vi.fn();
    const wrapper = mount(ShowCard, {
      props: {
        show: sampleShow,
        onClick,
      },
    });

    await wrapper.trigger('click');
    expect(onClick).toHaveBeenCalledOnce();
    expect(onClick).toHaveBeenCalledWith(sampleShow);
  });
});
