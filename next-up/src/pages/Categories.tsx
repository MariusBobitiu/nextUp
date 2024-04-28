import MovieCard from '@/components/common/MovieCard'
import Pagination from '@/components/common/Pagination'
import CategoriesLayout from '@/components/layout/CategoriesLayout'
import Loading from '@/components/layout/Loading'
import MovieModal from '@/components/MovieModal'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { MovieCardProps } from '@/types/MovieCard'

const Categories = () => {
  const [movieId, setMovieId] = useState<number>(0)
  const [page, setPage] = useState<number>(1)

  const navigate = useNavigate()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const page = parseInt(searchParams.get('page') || '1', 10)
    setPage(page)
  }, [location.search])

  const fetchMovies = async (page: number) => {
    const apiUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/movie/top_rated?language=en-UK&page=${page}&api_key=${import.meta.env.VITE_TMDB_API_KEY}`
    console.log('Fetching movies:', apiUrl)

    const res = await fetch(apiUrl)
    if (!res.ok) {
      throw new Error('Network response was not ok: ' + res.status)
    }

    const data = await res.json()
    return data
  }

  const handlePageChange = (newPage: number) => {
    const searchParams = new URLSearchParams(location.search)
    searchParams.set('page', newPage.toString())
    navigate(`?${searchParams.toString()}`, { replace: true })
  }

  const {
    data: movies,
    isLoading,
    error,
  } = useQuery(['movies', page], () => fetchMovies(page), {
    keepPreviousData: true,
  })

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
        <h1 className="text-3xl font-bold text-light-blue-100">
          Top Rated Movies
        </h1>
        <div className="flex h-full w-full flex-wrap items-center justify-center gap-4">
          {movies.results?.map((movie: MovieCardProps) => (
            <MovieCard
              onClick={() => openModal(movie.id as number)}
              key={movie.id}
              title={movie.title || movie.name || ''}
              overview={movie.overview}
              backdrop_path={movie.backdrop_path}
              poster_path={movie.poster_path}
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
          id={movieId}
          onClose={() => setMovieId(0)}
          type={movies.media_type as 'movie' | 'tv'}
        />
      </CategoriesLayout>
    </>
  )
}

export default Categories
