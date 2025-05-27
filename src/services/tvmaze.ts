import type { Show } from '@/types/Show';

export async function fetchAllShows(): Promise<Show[]> {
  const res = await fetch('https://api.tvmaze.com/shows');
  if (!res.ok) throw new Error('Failed to fetch shows');
  return res.json();
}

export async function fetchShowById(id: string | number): Promise<Show> {
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  if (!res.ok) throw new Error('Show not found');
  return res.json();
}

export async function searchShows(query: string): Promise<Show[]> {
  const res = await fetch(
    `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`,
  );
  if (!res.ok) throw new Error('Search failed');
  const data = await res.json();
  return data.map((result: { show: Show }) => result.show);
}
