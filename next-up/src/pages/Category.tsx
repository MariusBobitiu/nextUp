import CategoriesLayout from '@/components/layout/CategoriesLayout'
import Loading from '@/components/layout/Loading'
import getGenre from '@/services/getGenre'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import MovieCard from '@/components/common/MovieCard'
import MovieModal from '@/components/MovieModal'
import { MovieCardProps } from '@/types/MovieCard'

const Category = () => {
  const categoryId = Number(useParams().id)
  const categoryName = getGenre(categoryId)
  const [movieId, setMovieId] = useState<number>(0)

  const fetchMovies = async () => {
    const apiUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/discover/movie?with_genres=${categoryId}&api_key=${import.meta.env.VITE_TMDB_API_KEY}`
    const res = await fetch(apiUrl)
    if (!res.ok) {
      throw new Error('Network response was not ok: ' + res.status)
    }
    const data = await res.json()
    return data.results
  }

  useEffect(() => {
    document.title = `Next Up - Categories | ${categoryName}`
  }, [categoryName])

  const {
    data: movies,
    isLoading,
    error,
  } = useQuery(['movies', categoryId], fetchMovies, {
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
        <div className="flex w-full flex-wrap items-center justify-center gap-4 overflow-auto">
          {movies.map((movie: MovieCardProps) => (
            <MovieCard
              key={movie.id}
              onClick={openModal(movie.id as number)}
              title={movie.title}
              overview={movie.overview}
              backdrop_path={movie.backdrop_path}
              poster_path={movie.poster_path}
              genre_ids={movie.genre_ids}
            />
          ))}
        </div>
        <MovieModal id={movieId} onClose={() => setMovieId(0)} />
      </CategoriesLayout>
    </>
  )
}

export default Category
