import { useQuery } from 'react-query'
import Loading from './layout/Loading'
import { IoCloseCircleOutline as CloseIcon } from 'react-icons/io5'

const fetchMovie = async (id: number) => {
  const apiUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/movie/${id}?language=en-UL&api_key=${import.meta.env.VITE_TMDB_API_KEY}`

  const res = await fetch(apiUrl)
  if (!res.ok) {
    throw new Error('Network response was not ok: ' + res.status)
  }

  const data = await res.json()
  return data
}

type MovieModalProps = {
  id: number
  onClose: () => void
}

const MovieModal = ({ id, onClose }: MovieModalProps) => {
  const {
    data: movie,
    isLoading,
    error,
  } = useQuery(['movie', id], () => fetchMovie(id), { enabled: id !== 0 })

  if (isLoading) return <Loading />
  if (error)
    return <div className="w-full text-center">Error fetching movie!</div>

  if (!movie) return null

  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50">
      <div className="relative h-[600px] w-[400px] rounded-lg bg-navy-700 p-4">
        <button
          onClick={onClose}
          className="absolute right-2 top-2 z-10 rounded-full bg-navy-600 p-2"
        >
          <CloseIcon className="h-6 w-6 text-white" />
        </button>
        <div className="relative left-0 top-0 h-[300px] w-full rounded-lg">
          <img
            src={`${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/${movie.backdrop_path}`}
            alt="image placeholder"
            className="h-full w-full rounded-lg object-cover"
          />
          <div className="absolute left-0 top-0 h-full w-full rounded-lg bg-gradient-to-t from-navy-700 to-transparent" />
        </div>
        <div className="absolute bottom-2 left-0 z-10 h-[300px] w-full p-4">
          <h1 className="-mt-4 font-display text-2xl font-extrabold">
            {movie.title}
          </h1>
          <div className="my-2 flex flex-wrap items-center justify-start gap-1 text-xs">
            {movie.genres.map((genre: { id: number; name: string }) => (
              <span
                key={genre.id}
                className="rounded-lg border border-accent-teal px-2 py-1"
              >
                {genre.name}
              </span>
            ))}
          </div>
          <p className="line-clamp-6 py-4 text-sm">{movie.overview}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieModal
