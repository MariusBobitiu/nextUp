export type MovieCardProps = {
  onClick: () => void
  id?: number
  title: string
  overview: string
  backdrop_path: string
  poster_path: string
  genre_ids: number[]
}
