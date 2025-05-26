import type { Show, Episode, SearchResult } from '@/types/show'

const BASE_URL = 'https://api.tvmaze.com'

class TVMazeAPI {
  async getAllShows(): Promise<Show[]> {
    const res = await fetch(`${BASE_URL}/shows`)
    if (!res.ok) throw new Error(`Failed to fetch shows`)
    return res.json()
  }

  async searchShows(query: string): Promise<Show[]> {
    const res = await fetch(`${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`)
    if (!res.ok) throw new Error(`Search failed`)
    const data: { show: Show }[] = await res.json()
    return data.map(item => item.show)
  }

  async getShowById(id: string | number): Promise<Show> {
    const res = await fetch(`${BASE_URL}/shows/${id}`)
    if (!res.ok) throw new Error(`Show not found`)
    return res.json()
  }

  async getShowEpisodes(id: string | number): Promise<Episode[]> {
    const res = await fetch(`${BASE_URL}/shows/${id}/episodes`)
    if (!res.ok) throw new Error(`Episode fetch failed`)
    return res.json()
  }

  filterShowsByGenre(shows: Show[], genre: string): Show[] {
    return shows
      .filter(show => show.genres?.includes(genre))
      .sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0))
  }

  getUniqueGenres(shows: Show[]): string[] {
    const allGenres = shows.flatMap(show => show.genres || [])
    return [...new Set(allGenres)].sort()
  }
}

export const tvMazeApi = new TVMazeAPI()
