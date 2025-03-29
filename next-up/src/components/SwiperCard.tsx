import TinderCard from 'react-tinder-card'
import placeholder from '@/assets/placeholder.jpg'
import { getMovieGenre, getTVGenre } from '@/lib/utils'

type Direction = 'left' | 'right' | 'up' | 'down'

type SwiperCardProps = {
  onClick: () => void
  movie: {
    id?: number
    title: string
    name?: string
    media_type?: 'movie' | 'tv' | 'person'
    overview: string
    backdrop_path: string
    poster_path: string
    genre_ids: number[]
  }
  onSwipe: (dir: Direction) => void
}

const SwiperCard = ({ movie, onSwipe }: SwiperCardProps) => {
  return (
    <TinderCard
      onSwipe={(dir) => onSwipe(dir)}
      preventSwipe={['up', 'down']}
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className={`relative flex h-[400px] w-[300px] cursor-pointer flex-col rounded-lg border border-secondary-700 bg-secondary-800 transition-colors duration-500 ease-in-out hover:border-accent-teal-700`}
        >
          <div className="relative left-0 top-0 h-3/5 w-full rounded-t-lg">
            <img
              src={
                movie.backdrop_path
                  ? `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/${movie.backdrop_path}`
                  : movie.poster_path
                    ? `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/${movie.poster_path}`
                    : placeholder
              }
              alt="image placeholder"
              className="h-full w-full rounded-t-lg bg-center object-cover brightness-[0.70]"
            />
            <div className="absolute left-0 top-0 h-full w-full rounded-t-lg bg-gradient-to-t from-secondary-800 to-transparent" />
          </div>
          <div className="absolute bottom-2 left-0 z-10 h-2/3 w-full p-4">
            <h1 className="-mt-4 font-display text-2xl font-extrabold">
              {movie.title}
            </h1>
            <div className="my-2 flex flex-wrap items-center justify-start gap-1 text-xs">
              {movie.genre_ids &&
                movie.genre_ids.map((genre, index) => (
                  <span
                    key={genre.toString() + index}
                    className="rounded-lg border border-accent-teal px-2 py-1"
                  >
                    {getMovieGenre(genre) || getTVGenre(genre)}
                  </span>
                ))}
            </div>
            <p className="line-clamp-6 py-4 text-sm">{movie.overview}</p>
          </div>
        </div>
      </div>
    </TinderCard>
  )
}

export default SwiperCard
