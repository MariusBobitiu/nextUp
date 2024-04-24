import { useQuery } from 'react-query'
import Loading from './layout/Loading'
import { IoCloseCircleOutline as CloseIcon } from 'react-icons/io5'
import placeholder from '@/assets/placeholder.jpg'

const fetchMovies = async (id: number, type: 'tv' | 'movie' | 'person') => {
  const apiUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/${type}/${id}?language=en-UK&api_key=${import.meta.env.VITE_TMDB_API_KEY}`
  console.log('Fetching movie:', apiUrl)

  const res = await fetch(apiUrl)
  if (!res.ok) {
    throw new Error('Network response was not ok: ' + res.status)
  }

  const data = await res.json()
  return data
}

type MovieModalProps = {
  id: number
  type: 'movie' | 'tv' | 'person'
  onClose: () => void
}

const MovieModal = ({ id, type, onClose }: MovieModalProps) => {
  const {
    data: movie,
    isLoading,
    error,
  } = useQuery(['movie', id], () => fetchMovies(id, type), {
    enabled: id !== 0,
  })

  if (isLoading) return <Loading />
  if (error)
    return <div className="w-full text-center">Error fetching movie!</div>

  if (!movie || type === 'person') return null

  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50">
      <div className="relative flex h-3/5 w-1/2 gap-4 rounded-lg bg-navy-700 p-8">
        <button onClick={onClose} className="absolute right-2 top-2 z-10 p-2">
          <CloseIcon className="h-6 w-6 text-white" />
        </button>
        <div className="relative left-0 top-0 h-full w-full rounded-lg">
          <img
            src={
              movie.poster_path
                ? `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/${movie.poster_path}`
                : movie.backdrop_path
                  ? `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/${movie.backdrop_path}`
                  : placeholder
            }
            alt="image placeholder"
            className="h-full w-full rounded-lg bg-center object-cover"
          />
        </div>
        <div className="relative flex w-full flex-col gap-4 p-2">
          <h1 className="font-display text-4xl font-bold">{movie.title}</h1>
          <div className="my-2 flex flex-wrap items-center justify-start gap-1 text-sm">
            {movie.genres.map((genre: { id: number; name: string }) => (
              <span
                key={genre.id}
                className="cursor-default rounded-lg border border-accent-teal px-2 py-1 transition-colors duration-500 ease-in-out hover:bg-accent-teal-900"
              >
                {genre.name}
              </span>
            ))}
          </div>
          <div className="flex justify-between text-lg">
            <div className="flex flex-col">
              <span>Rating: {movie.vote_average}</span>
              <span>({movie.vote_count} votes)</span>
            </div>
            <span>{movie.release_date?.substring(0, 4)}</span>
          </div>
          <p className="">{movie.overview}</p>
          <div className="flex gap-4">
            <span className="text-light-blue/50">
              {type === 'movie'
                ? `Duration: ${movie.runtime} mins`
                : `Total: ${movie.seasons.length} seasons`}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieModal
