import MovieCard from '@/components/common/MovieCard'
import CategoriesLayout from '@/components/layout/CategoriesLayout'
import Loading from '@/components/layout/Loading'
import MovieModal from '@/components/MovieModal'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

type MovieProps = {
  id: number
  title: string
  overview: string
  backdrop_path: string
  genre_ids: number[]
}

const Categories = () => {
  const [movieId, setMovieId] = useState<number>(0)

  const fetchMovies = async () => {
    const apiUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/movie/top_rated?language=en-UK&api_key=${import.meta.env.VITE_TMDB_API_KEY}`

    const res = await fetch(apiUrl)
    if (!res.ok) {
      throw new Error('Network response was not ok: ' + res.status)
    }

    const data = await res.json()
    return data.results
  }

  const { data: movies, isLoading, error } = useQuery('movies', fetchMovies)

  useEffect(() => {
    document.title = 'Next Up - Categories'
  }, [])

  if (isLoading) return <Loading />
  if (error)
    return <div className="w-full text-center">Error fetching categories!</div>

  const openModal = (id: number) => {
    console.log(`Opening Modal for id: ${id}`)
    setMovieId(id)
  }

  return (
    <>
      <CategoriesLayout>
        <div className="flex w-full flex-wrap items-center justify-center gap-4 overflow-auto">
          {movies.map((movie: MovieProps) => (
            <MovieCard
              onClick={() => openModal(movie.id)}
              key={movie.id}
              title={movie.title}
              overview={movie.overview}
              backdrop_path={movie.backdrop_path}
              genre_ids={movie.genre_ids}
            />
          ))}
        </div>
        <MovieModal id={movieId} onClose={() => setMovieId(0)} />
      </CategoriesLayout>
    </>
  )
}

export default Categories
