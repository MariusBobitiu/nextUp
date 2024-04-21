// type Props = {}

import Loading from '@/components/layout/Loading'
import SwiperCard from '@/components/SwiperCard'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

type movieProps = {
  id: number
  title: string
  poster_path: string
}

const Swiper = () => {
  const [lastDirection, setLastDirection] = useState<string>('')

  const fetchMovies = async () => {
    const apiUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/trending/all/week?language=en-UK&page=1&api_key=${import.meta.env.VITE_TMDB_API_KEY}`

    const res = await fetch(apiUrl)
    const data = await res.json()
    return data
  }

  useEffect(() => {
    document.title = 'Swiper | Next Up'
  }, [])

  const onSwipe = (id: number, dir: 'left' | 'right' | 'up' | 'down') => {
    console.log(`Swiped ${dir} on movie id: ${id}`)
    setLastDirection(dir)
  }

  const { data: movies, isLoading, error } = useQuery('movies', fetchMovies)

  if (isLoading) return <Loading />
  if (error) return <div>There was an error fetching movies!</div>

  return (
    <div className="flex min-h-[800px] w-full items-center justify-center overflow-hidden">
      {movies?.results.map((movie: movieProps) => (
        <SwiperCard key={movie.id} movie={movie} onSwipe={onSwipe} />
      ))}
    </div>
  )
}

export default Swiper
