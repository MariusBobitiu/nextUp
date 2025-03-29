import CategoriesLayout from '@/components/layout/CategoriesLayout'
import Loading from '@/components/layout/Loading'
import { useQuery } from 'react-query'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import MovieCard from '@/components/common/MovieCard'
import MovieModal from '@/components/MovieModal'
import { MovieCardProps } from '@/types/MovieCard'
import Pagination from '@/components/common/Pagination'
import { getMovieGenre } from '@/lib/utils'

const Category = () => {
  const categoryId = Number(useParams().id)
  const categoryName = getMovieGenre(categoryId)
  const [movieId, setMovieId] = useState<number>(0)
  const [page, setPage] = useState<number>(1)

  const location = useLocation()
  const navigate = useNavigate()

  const fetchMovies = async (page: number) => {
    const apiUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/discover/movie?with_genres=${categoryId}&page=${page}&api_key=${import.meta.env.VITE_TMDB_API_KEY}`
    console.log('Fetching movies by category:', apiUrl)

    const res = await fetch(apiUrl)
    if (!res.ok) {
      throw new Error('Network response was not ok: ' + res.status)
    }
    const data = await res.json()
    return data
  }

  useEffect(() => {
    document.title = `Next Up - Categories | ${categoryName}`
    setPage(1)
  }, [categoryName])

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const page = parseInt(searchParams.get('page') || '1', 10)
    setPage(page)
  }, [location.search])

  const handlePageChange = (newPage: number) => {
    const searchParams = new URLSearchParams(location.search)
    searchParams.set('page', newPage.toString())
    navigate(`?${searchParams.toString()}`, { replace: true })
  }

  const {
    data: movies,
    isLoading,
    error,
  } = useQuery(['movies', categoryId, page], () => fetchMovies(page), {
    enabled: !!categoryId,
  })

  if (isLoading) return <Loading />
  if (error)
    return <div className="w-full text-center">Error fetching categories!</div>

  const openModal = (id: number) => () => {
    console.log(`Opening Modal for id: ${id}`)
    setMovieId(id)
  }

  return (
    <>
      <CategoriesLayout>
        <h1 className="ml-4 text-3xl font-bold">{categoryName}</h1>
        <div className="flex w-full flex-wrap items-center justify-center gap-4 overflow-auto">
          {movies.results?.map((movie: MovieCardProps) => (
            <MovieCard
              key={movie.id}
              onClick={openModal(movie.id as number)}
              title={movie.title || movie.name || ''}
              overview={movie.overview}
              backdrop_path={movie.backdrop_path}
              poster_path={movie.poster_path}
              genre_ids={movie.genre_ids}
            />
          ))}
        </div>
        <Pagination
          currentPage={movies.page || 1}
          totalPages={movies.total_pages || 1}
          onPageChange={(newPage: number) => {
            handlePageChange(newPage)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          button_bg_color='bg-gradient-to-b from-accent-400 to-accent-700'
          text_color='text-primary-100'
          button_bg_hover='brightness-90'
          button_bg_active='brightness-75'
          page_bg_hover='bg-secondary-700'
        />
        <MovieModal type="movie" id={movieId} onClose={() => setMovieId(0)} />
      </CategoriesLayout>
    </>
  )
}

export default Category
