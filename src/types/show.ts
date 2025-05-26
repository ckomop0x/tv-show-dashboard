export interface Show {
  id: number
  name: string
  genres: string[]
  summary: string
  rating: { average: number | null }
  image: { medium: string; original: string } | null
}

export interface Episode {
  id: number
  name: string
  season: number
  number: number
}

export interface SearchResult {
  show: Show
}
