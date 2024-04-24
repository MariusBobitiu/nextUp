// type Props = {}

import Loading from '@/components/layout/Loading'
import SwiperCard from '@/components/SwiperCard'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { MovieCardProps } from '@/types/MovieCard'

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
    setLastDirection(dir)
  }

  useEffect(() => {
    if (lastDirection === 'left') {
      console.log('You liked the movie!')
    } else if (lastDirection === 'right') {
      console.log('You disliked the movie!')
    }
  }, [lastDirection])

  const { data: movies, isLoading, error } = useQuery('movies', fetchMovies)

  if (isLoading) return <Loading />
  if (error) return <div>There was an error fetching movies!</div>

  return (
    <>
      <div className="absolute left-0 top-0 z-40 flex h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-b from-navy-800 to-navy-700">
        <h1>
          This feature is currently under development. Please check back later!
        </h1>
      </div>
      <div className="flex min-h-[800px] w-full items-center justify-center overflow-hidden">
        {movies?.results.map((movie: MovieCardProps) => (
          <SwiperCard
            key={movie.id}
            movie={movie}
            onSwipe={onSwipe}
            onClick={() => {
              console.log('Clicked!')
            }}
          />
        ))}
      </div>
    </>
  )
}

export default Swiper
