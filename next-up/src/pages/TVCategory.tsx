import Pagination from '@/components/common/Pagination'
import Loading from '@/components/layout/Loading'
import MovieModal from '@/components/MovieModal'
import MovieCard from '@/components/common/MovieCard'
import { getTVGenre } from '@/services/getGenre'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import CategoriesLayout from '@/components/layout/CategoriesLayout'
import { MovieCardProps } from '@/types/MovieCard'

const TVCategory = () => {
  const categoryId = Number(useParams().id)
  const categoryName = getTVGenre(categoryId)
  console.log('TV Category ID:', categoryId)
  const [page, setPage] = useState<number>(1)
  const [movieId, setMovieId] = useState<number>(0)

  const fetchTVShows = async (page: number) => {
    const apiUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/discover/tv?with_genres=${categoryId}&page=${page}&api_key=${import.meta.env.VITE_TMDB_API_KEY}`
    console.log('Fetching TV shows by category:', apiUrl)

    const res = await fetch(apiUrl)
    if (!res.ok) {
      throw new Error('Network response was not ok: ' + res.status)
    }
    const data = await res.json()
    return data
  }

  const navigate = useNavigate()
  const location = useLocation()

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
    data: tvShows,
    isLoading,
    error,
  } = useQuery(['tvShows', categoryId, page], () => fetchTVShows(page), {
    enabled: !!categoryId,
  })

  const openModal = (id: number) => () => {
    console.log(`Opening Modal for id: ${id}`)
    setMovieId(id)
  }

  if (isLoading) return <Loading />
  if (error)
    return <div className="w-full text-center">Error fetching TV shows!</div>

  return (
    <CategoriesLayout>
      <h1 className="ml-4 text-3xl font-bold">{categoryName}</h1>
      <div className="flex w-full flex-wrap items-center justify-center gap-4 overflow-auto">
        {tvShows.results.map((tvShow: MovieCardProps) => (
          <MovieCard
            key={tvShow.id}
            onClick={openModal(tvShow.id as number)}
            title={tvShow.name || ''}
            backdrop_path={tvShow.backdrop_path}
            poster_path={tvShow.poster_path}
            overview={tvShow.overview}
            genre_ids={tvShow.genre_ids}
          />
        ))}
        <Pagination
          currentPage={tvShows.page || 1}
          totalPages={tvShows.total_pages || 1}
          onPageChange={(newPage: number) => {
            handlePageChange(newPage)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        />
        <MovieModal type="tv" id={movieId} onClose={() => setMovieId(0)} />
      </div>
    </CategoriesLayout>
  )
}

export default TVCategory
