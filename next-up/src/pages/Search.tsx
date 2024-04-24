import { Suspense, useEffect, useState } from 'react'
import Loading from '@/components/layout/Loading'
import SearchBar from '@/components/common/Search'
import MovieCard from '@/components/common/MovieCard'
import MovieModal from '@/components/MovieModal'
import { useQuery } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { MovieCardProps } from '@/types/MovieCard'
import Pagination from '@/components/common/Pagination'

const fetchMovies = async (page: number) => {
  const apiUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/trending/all/week?language=en-UK&page=${page}&api_key=${import.meta.env.VITE_TMDB_API_KEY}`

  const res = await fetch(apiUrl)
  if (!res.ok) {
    throw new Error('Network response was not ok: ' + res.status)
  }

  const data = await res.json()
  return data
}

const Search = () => {
  const [movieId, setMovieId] = useState<number>(0)
  const [movieType, setMovieType] = useState<'movie' | 'tv'>('movie')
  const [term, setTerm] = useState<string>('')
  const [page, setPage] = useState<number>(1)

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const searchTerm = searchParams.get('search') || ''

    setTerm(searchTerm)
    setPage(page)
  }, [location.search])

  useEffect(() => {
    if (term) {
      setPage(1)
    }
  }, [term])

  useEffect(() => {
    console.log('Page changed:', page)
    console.log('Search term:', term)
  }, [page, term])

  const handlePageChange = (newPage: number) => {
    const searchParams = new URLSearchParams(location.search)
    searchParams.set('page', newPage.toString())
    if (term) searchParams.set('search', term)
    navigate(`?${searchParams.toString()}`, { replace: true })
  }

  const fetchMoviesByTerm = async (page: number, searchTerm: string) => {
    const apiUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/search/multi?query=${searchTerm}&language=en-UK&page=${page}&api_key=${import.meta.env.VITE_TMDB_API_KEY}`
    console.log('Fetching movies by term:', apiUrl)

    const res = await fetch(apiUrl)
    if (!res.ok) {
      throw new Error('Network response was not ok: ' + res.status)
    }

    const data = await res.json()
    return data
  }

  const {
    data: movies,
    isLoading,
    error,
  } = useQuery(
    ['movies', term, page],
    () => (term !== '' ? fetchMoviesByTerm(page, term) : fetchMovies(page)),
    {
      keepPreviousData: true,
      enabled: true,
    }
  )

  useEffect(() => {
    if (term) {
      document.title = `Next Up - Search | ${term}`
    } else {
      document.title = 'Next Up - Home'
    }
  }, [term])

  const openModal = (id: number, type: 'movie' | 'tv') => {
    console.log(`Opening Modal for id: ${id}`)
    setMovieType(type)
    setMovieId(id)
  }

  if (isLoading) return <Loading />
  if (error)
    return <div className="w-full text-center">Error fetching movies!</div>

  return (
    <main className="flex h-full w-full flex-col gap-4 overflow-hidden p-12">
      <Suspense fallback={<Loading />}>
        <div className="w-full">
          <SearchBar />
        </div>
        <div className="mt-8 flex h-2/3 w-full flex-wrap items-center justify-center gap-4 overflow-auto">
          {movies.results?.map((movie: MovieCardProps) => (
            <MovieCard
              onClick={() =>
                openModal(
                  movie.id as number,
                  movie.media_type as 'movie' | 'tv'
                )
              }
              key={movie.id}
              title={movie.title || movie.name || ''}
              overview={movie.overview}
              poster_path={movie.poster_path}
              backdrop_path={movie.backdrop_path}
              genre_ids={movie.genre_ids}
            />
          ))}
        </div>
        <Pagination
          currentPage={movies?.page || 1}
          totalPages={movies?.total_pages || 1}
          onPageChange={(newPage: number) => {
            handlePageChange(newPage)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        />
        <MovieModal
          type={movieType}
          id={movieId}
          onClose={() => setMovieId(0)}
        />
      </Suspense>
    </main>
  )
}

export default Search
