import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Rating from '@/components/Rating.vue';

describe('Rating.vue', () => {
  it('renders formatted rating and correct title when rating is present', () => {
    const wrapper = mount(Rating, {
      props: {
        rating: 8.2,
      },
    });

    expect(wrapper.text()).toContain('8.2');
    expect(wrapper.attributes('title')).toBe('Average rating 8.2');
  });

  it('renders fallback "-" and correct title when rating is null', () => {
    const wrapper = mount(Rating, {
      props: {
        rating: null,
      },
    });

    expect(wrapper.text()).toContain('-');
    expect(wrapper.attributes('title')).toBe('Average rating -');
  });

  it('renders fallback "-" and correct title when rating is undefined', () => {
    const wrapper = mount(Rating, {
      props: {
        rating: undefined,
      },
    });

    expect(wrapper.text()).toContain('-');
    expect(wrapper.attributes('title')).toBe('Average rating -');
  });

  it('renders star icon (svg)', () => {
    const wrapper = mount(Rating, {
      props: { rating: 7 },
    });

    expect(wrapper.find('svg').exists()).toBe(true);
  });
});
