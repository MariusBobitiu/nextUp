import { useState } from 'react'
import placeholder from '@/assets/placeholder.jpg'
import { MovieCardProps } from '@/types/MovieCard'
import { getMovieGenre, getTVGenre } from '@/services/getGenre'

const MovieCard = ({
  onClick,
  title,
  overview,
  backdrop_path,
  poster_path,
  genre_ids,
}: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`relative flex h-[400px] w-[300px] cursor-pointer flex-col rounded-lg border border-navy-600 bg-navy-700 transition-colors duration-500 ease-in-out hover:border-accent-teal-700`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative left-0 top-0 h-3/5 w-full rounded-t-lg">
        <img
          src={
            backdrop_path
              ? `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/${backdrop_path}`
              : poster_path
                ? `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/${poster_path}`
                : placeholder
          }
          alt="image placeholder"
          className={`h-full w-full rounded-t-lg bg-center object-cover brightness-[0.70] ${isHovered ? 'brightness-[1.05]' : 'brightness-[0.70]'} transition-all duration-500 ease-in-out`}
        />
        <div className="absolute left-0 top-0 h-full w-full rounded-t-lg bg-gradient-to-t from-navy-700 to-transparent" />
      </div>
      <div className="absolute bottom-2 left-0 z-10 h-2/3 w-full p-4">
        <h1 className="-mt-4 font-display text-2xl font-extrabold">{title}</h1>
        <div className="my-2 flex flex-wrap items-center justify-start gap-1 text-xs">
          {genre_ids &&
            genre_ids.map((genre, index) => (
              <span
                key={genre.toString() + index}
                className="rounded-lg border border-accent-teal px-2 py-1"
              >
                {getMovieGenre(genre) || getTVGenre(genre)}
              </span>
            ))}
        </div>
        <p className="line-clamp-6 py-4 text-sm">{overview}</p>
      </div>
    </div>
  )
}

export default MovieCard
