import { Suspense, useEffect, useState } from 'react'
import Loading from '@/components/layout/Loading'
import Search from '@/components/common/Search'
import MovieCard from '@/components/common/MovieCard'
import MovieModal from '@/components/MovieModal'
import { useQuery } from 'react-query'
//import { useNavigate } from 'react-router-dom'

type MovieProps = {
  id: number
  title: string
  overview: string
  backdrop_path: string
  genre_ids: number[]
}

const fetchMovies = async () => {
  const apiUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/trending/movie/week?language=en-UL&api_key=${import.meta.env.VITE_TMDB_API_KEY}`

  const res = await fetch(apiUrl)
  if (!res.ok) {
    throw new Error('Network response was not ok: ' + res.status)
  }

  const data = await res.json()
  return data.results
}

const Home = () => {
  //  const navigate = useNavigate()
  const { data: movies, isLoading, error } = useQuery('movies', fetchMovies)
  const [movieId, setMovieId] = useState<number>(0)

  const openModal = (id: number) => {
    console.log(`Opening Modal for id: ${id}`)
    setMovieId(id)
    // navigate(`/${id}`)
  }

  useEffect(() => {
    document.title = 'Next Up - Home'
  }, [])

  if (isLoading) return <Loading />
  if (error)
    return <div className="w-full text-center">Error fetching movies!</div>

  return (
    <main className="flex h-full w-full flex-col gap-4 overflow-hidden p-12">
      <Suspense fallback={<Loading />}>
        <div className="w-full">
          <Search />
        </div>
        <div className="mt-8 flex h-2/3 w-full flex-wrap items-center justify-center gap-4 overflow-auto">
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
      </Suspense>
    </main>
  )
}

export default Home
