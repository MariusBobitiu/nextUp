export type MovieCardProps = {
  onClick: () => void
  id?: number
  title: string
  name?: string
  media_type?: 'movie' | 'tv' | 'person'
  overview: string
  backdrop_path: string
  poster_path: string
  genre_ids: number[]
}
