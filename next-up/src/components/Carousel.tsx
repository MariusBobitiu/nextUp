import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import SwiperCore from 'swiper'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { MovieCardProps } from '@/types/MovieCard'
import { useQuery } from 'react-query'

import placeholder from '@/assets/placeholder.jpg'
import MovieModal from './MovieModal'

const Carousel = () => {
  const [movieId, setMovieId] = useState<number>(0)
  const [movieType, setMovieType] = useState<'movie' | 'tv'>('movie')

  const fetchMovies = async () => {
    const apiUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/trending/all/week?language=en-UK&api_key=${import.meta.env.VITE_TMDB_API_KEY}`

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
  } = useQuery('movies', () => fetchMovies(), {
    keepPreviousData: true,
    enabled: true,
  })

  useEffect(() => {
    console.log('Movies:', movies)
  }, [movies])

  const onSlideChange = (swiper: SwiperCore) => {
    const slides = swiper.slides
    const activeIndex = swiper.activeIndex

    slides.forEach((slide: HTMLElement) => {
      slide.style.transform = 'scale(0.85)'
      slide.style.filter = 'brightness(0.8)'
      slide.style.transition = 'transform 0.5s, filter 0.7s'
      slide.style.borderRadius = '0.5rem'
      slide.style.cursor = 'w-resize'
    })

    const activeSlide = slides[activeIndex]
    activeSlide.style.transform = 'scale(0.98)'
    activeSlide.style.filter = 'brightness(1.2)'
    activeSlide.style.transition = 'transform 0.5s, filter 0.7s'
    activeSlide.style.borderRadius = '0.5rem'
    activeSlide.style.cursor = 'help'
  }

  const openModal = (id: number, type: 'movie' | 'tv') => {
    console.log('Opening modal:', id, type)
    setMovieId(id)
    setMovieType(type)
  }

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  return (
    <>
      <Swiper
        onSlideChange={onSlideChange}
        modules={[Autoplay, Pagination]}
        spaceBetween={-25}
        slidesPerView={3}
        centeredSlides={true}
        centeredSlidesBounds={true}
        loop={true}
        speed={1500}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
      >
        {movies.results?.map((movie: MovieCardProps, index: number) => (
            <SwiperSlide
            key={index}
              onClick={() =>
                openModal(movie.id as number, movie.media_type as 'movie' | 'tv')
              }
            >
              <img
                src={
                  movie.backdrop_path
                    ? `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/${movie.backdrop_path}`
                    : movie.poster_path
                      ? `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/${movie.poster_path}`
                      : placeholder
                }
                alt={movie.title}
                className="absolute left-[50%] top-[50%] z-0 h-[95%] w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-center object-cover brightness-75 transition-all duration-500 ease-in-out"
              />
              <p className="absolute bottom-4 left-0 z-10 w-full text-center text-3xl">
                {movie.title ? movie.title : movie.name}
              </p>
            </SwiperSlide>
        ))}
      </Swiper>
      <MovieModal type={movieType} id={movieId} onClose={() => setMovieId(0)} />
    </>
  )
}

export default Carousel
