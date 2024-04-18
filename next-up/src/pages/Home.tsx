import { Suspense, useEffect, useState } from 'react'
import Loading from '@/components/layout/Loading'
import Search from '@/components/common/Search'
import MovieCard from '@/components/common/MovieCard'
import MovieModal from '@/components/MovieModal'
import { useQuery } from 'react-query'
import { useLocation } from 'react-router-dom'
import { MovieCardProps } from '@/types/MovieCard'

const fetchMovies = async () => {
  const apiUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/trending/movie/week?language=en-UK&api_key=${import.meta.env.VITE_TMDB_API_KEY}`

  const res = await fetch(apiUrl)
  if (!res.ok) {
    throw new Error('Network response was not ok: ' + res.status)
  }

  const data = await res.json()
  return data.results
}

const Home = () => {
  const [movieId, setMovieId] = useState<number>(0)
  const [searchTerm, setSearchTerm] = useState<string>('')

  const location = useLocation()

  useEffect(() => {
    if (location.search) {
      const searchParams = new URLSearchParams(location.search)
      const searchTerm = searchParams.get('search')
      setSearchTerm(searchTerm || '')
    }
  }, [location.search])

  const fetchMoviesByTerm = async () => {
    const apiUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/search/movie?query=${searchTerm}&language=en-UK&api_key=${import.meta.env.VITE_TMDB_API_KEY}`

    const res = await fetch(apiUrl)
    if (!res.ok) {
      throw new Error('Network response was not ok: ' + res.status)
    }

    const data = await res.json()
    return data.results
  }

  const {
    data: movies,
    isLoading,
    error,
  } = useQuery(
    ['movies', searchTerm],
    searchTerm !== '' ? fetchMoviesByTerm : fetchMovies,
    {
      enabled: true,
    }
  )

  useEffect(() => {
    if (searchTerm) {
      document.title = `Next Up - Search | ${searchTerm}`
    } else {
      document.title = 'Next Up - Home'
    }
  }, [searchTerm])

  const openModal = (id: number) => {
    console.log(`Opening Modal for id: ${id}`)
    setMovieId(id)
  }

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
          {movies &&
            movies.map((movie: MovieCardProps) => (
              <MovieCard
                onClick={() => openModal(movie.id as number)}
                key={movie.id}
                title={movie.title}
                overview={movie.overview}
                poster_path={movie.poster_path}
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
