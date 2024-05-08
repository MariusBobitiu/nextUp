import Loading from '@/components/layout/Loading'
import { useState } from 'react'
import { PiArrowFatLinesRightFill as ArrowRightIcon } from "react-icons/pi";
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { FaBookmark as FilledBookmark, FaRegBookmark as EmptyBookmark, FaExternalLinkAlt as ExternalLinkIcon, FaPlay as PlayIcon } from 'react-icons/fa'
import { fetchMovie, fetchReleaseDateGB, fetchCredits, fetchKeywords, fetchImages, fetchVideos, fetchReviews } from '@/services/fetchData'
import getLanguage from '@/services/getLanguage'
import MoviePlayerModal from '@/components/MoviePlayerModal'
import formatCurrency from '@/services/formatCurrency';
import ReviewComponent from '@/components/ReviewComponent';
import { Review } from '@/types/MovieDetails';

const MovieDetails = () => {
  const { slug } = useParams()
  const movieId = slug?.split('-').reverse().pop()
  const [bookmarked, setBookmarked] = useState(false)
  const [activeMedia, setActiveMedia] = useState('images')
  const [videoTitle, setVideoTitle] = useState('')
  const [videoKey, setVideoKey] = useState('')

  const navigate = useNavigate();

  const {data: movie, isLoading, isError} = useQuery('movie', () => fetchMovie(movieId || ''), {
    enabled: !!movieId,
  })
  const {data: releaseDate} = useQuery('releaseDate', () => fetchReleaseDateGB(movieId || ''), {
    enabled: !!movieId,
  })
  const {data: credits} = useQuery('credits', () => fetchCredits(movieId || ''), {
    enabled: !!movieId,
  })
  const {data: keywords} = useQuery('keywords', () => fetchKeywords(movieId || ''), {
    enabled: !!movieId,
  })
  const {data: images} = useQuery('images', () => fetchImages(movieId || ''), {
    enabled: !!movieId,
  })
  const {data: videos} = useQuery('videos', () => fetchVideos(movieId || ''), {
    enabled: !!movieId,
  })
  const {data: reviews} = useQuery('reviews', () => fetchReviews(movieId || ''), {
    enabled: !!movieId,
  })

  const trailer = videos?.results.find((video: { type: string }) => video.type === 'Trailer')

  const formatDuration = () => {
    const hours = Math.floor(movie.runtime / 60)
    const minutes = movie.runtime % 60
    return `${hours}h ${minutes}m`
  }

  const addToWatchlist = () => {
    setBookmarked(!bookmarked)
  }


  if (isLoading) return <Loading />
  if (isError) return <div>Error fetching movie details</div>

  return (
    <>
      <div className="w-full relative px-12">
        <MoviePlayerModal 
          videoTitle={videoTitle} 
          videoKey={videoKey} 
          setVideoTitle={setVideoTitle}
          setVideoKey={setVideoKey}
        />
        {movie && (
          <>
            <div className="absolute left-0 top-0 z-10 h-96 w-full rounded-md">
              <img
                className="z-0 h-full w-full rounded-md object-cover"
                src={`${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/${movie.backdrop_path}`}
                alt={movie.title}
              />
            </div>
            <div className="absolute left-0 top-0 z-10 h-96 w-full bg-gradient-to-br from-navy-600 via-navy-800 to-navy-600 opacity-60"></div>
            <div className="relative z-10 flex flex-col items-start justify-center w-full">
              <div className="flex w-full items-center justify-between p-12 pt-24">
                <div className="flex justify-center">
                  <img
                    className="h-80 w-52 rounded-lg object-cover shadow-lg"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                </div>
                <button
                  className='px-2 py-2 text-accent-teal hover:text-accent-teal-700 absolute top-2 right-2'
                  onClick={addToWatchlist}
                >
                  {bookmarked ? <FilledBookmark className='h-10 w-10'  /> : <EmptyBookmark className='h-10 w-10' />}
                </button>
                <div className="flex w-1/2 flex-col items-end justify-center gap-2">
                  <h1 className="text-center text-4xl font-bold">
                    {movie.title} ({movie.release_date.slice(0, 4)})
                  </h1>
                  <p className="-mt-2 mb-2 text-center text-light-blue-400">
                    {movie.tagline ? movie.tagline : 'No tagline'}
                  </p>
                  <div className="flex w-full items-center justify-end gap-2">
                    {releaseDate?.results?.find(
                      (result: { iso_3166_1: string }) =>
                        result.iso_3166_1 === 'GB'
                    )?.release_dates[0].release_date ? (
                      <p className="flex gap-2 text-xl">
                        <span className="border border-light-blue-300 px-1">
                          {
                            releaseDate?.results?.find(
                              (result: { iso_3166_1: string }) =>
                                result.iso_3166_1 === 'GB'
                            )?.release_dates[0].certification
                          }
                        </span>
                        {releaseDate?.results
                          ?.find(
                            (result: { iso_3166_1: string }) =>
                              result.iso_3166_1 === 'GB'
                          )
                          ?.release_dates[0].release_date.slice(0, 10)}{' '}
                        (GB)
                        <span>●</span>
                      </p>
                    ) : (
                      <span className="text-lg">Release date unknown</span>
                    )}
                    {movie.genres.map((genre: { id: number; name: string }, index: number) => (
                      <span
                        key={genre.id}
                        className="text-lg text-light-blue-300"
                      >
                        {genre.name}{index < movie.genres.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                    <span>●</span>
                    <p className="text-lg">{formatDuration()}</p>
                  </div>
                  <a
                    href={`#player-${trailer.key}`}
                    rel="noreferrer"
                    className="text-accent-teal hover:text-accent-teal-700 text-xl"
                    onClick={() => {
                      setVideoTitle(trailer.name)
                      setVideoKey(trailer.key)
                    }}
                  >
                    <PlayIcon className="inline-block -mt-1 mr-2 text-lg" />
                    Watch trailer
                  </a>
                </div>
              </div>
              <div className='flex justify-between items-start p-4 pt-0 w-full gap-2 mb-20'>
                <div className='w-3/4'>
                  <div className='flex justify-start items-start pb-4 gap-4 overflow-x-auto max-w-4/5'>
                    {credits?.cast.slice(0,10).map((actor: { id: number; name: string; profile_path: string, character: string }) => (
                      <div key={actor.id} className='flex flex-col items-center justify-start gap-1 min-w-40 h-80 bg-navy-500 rounded-lg pb-2'>
                        <img
                          className='h-3/4 w-full object-cover rounded-t-lg'
                          src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                          alt={actor.name}
                        />
                        <p className='px-2 text-md text-center font-bold'>{actor.name}</p>
                        <p className='text-sm'>{actor.character}</p>
                      </div>
                    ))}
                    <div className='flex flex-col items-center justify-start gap-1 min-w-40 h-80'>
                      <button 
                        className='flex flex-col justify-center items-center p-2 min-w-40 min-h-full rounded-lg bg-navy-600'
                        onClick={() => navigate(`/movie/${slug}/cast`)}
                        >
                        <span className='text-center text-md font-bold'>
                          View More <ArrowRightIcon className='inline-block -mt-1' />
                        </span>
                      </button>
                    </div>
                  </div>
                  <button 
                    className='text-lg font-semibold py-4'
                    onClick={() => navigate(`/movie/${slug}/cast`)}
                    >
                    See full cast and crew <ArrowRightIcon className='inline-block -mt-1' />
                  </button>
                  <div className='w-full flex flex-col'>
                    <div className='flex gap-6 text-xl'>
                      <h2 className='text-3xl font-bold mr-16'>Media </h2>
                      <button 
                        className={`border-b ${activeMedia === 'images' ? 'border-accent-teal' : 'border-transparent'}`}
                        onClick={() => setActiveMedia('images')}
                      >
                        Images
                      </button>
                      <button 
                        className={`border-b ${activeMedia === 'videos' ? 'border-accent-teal' : 'border-transparent'}`}
                        onClick={() => setActiveMedia('videos')}
                      >
                        Videos
                      </button>
                      <button 
                        className={`border-b ${activeMedia === 'posters' ? 'border-accent-teal' : 'border-transparent'}`}
                        onClick={() => setActiveMedia('posters')}
                      >
                        Posters
                      </button>
                    </div>
                    <div className='flex justify-start items-start gap-4 overflow-x-auto py-2'>
                      {activeMedia === 'images' && (
                        <>
                          {images?.backdrops.slice(0, 5).map((image: { file_path: string; id: string }) => (
                            <img
                              key={image.id}
                              className='h-80 min-w-[30rem] object-cover rounded-lg my-4'
                              src={`${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/${image.file_path}`}
                              alt={movie.title}
                            />
                          ))}
                            <div className='bg-navy-600 my-4 rounded-lg h-80 min-w-64 w-full flex justify-center items-center'>
                              <button
                                className='text-xl text-light-blue-200 hover:text-light-blue-400'
                                onClick={() => navigate(`/movie/${slug}/images`)}
                              >
                                View all images <ArrowRightIcon className='inline-block -mt-1' />
                              </button>
                            </div>
                        </>
                      )}
                      {activeMedia === 'videos' && (
                        <>
                          {videos?.results.slice(0, 5).map((video: { key: string; id: string; name: string }) => (
                            <div className={`relative h-80 min-w-[30rem] rounded-lg my-4`}>
                              <img
                                className='h-full w-full object-cover rounded-lg'
                                src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
                                alt={movie.title}
                              />
                              <a
                                href={`#player-${video.id}`}
                                rel='noreferrer'
                                className='absolute top-0 left-0 text-light-blue-200 hover:text-accent-teal w-full h-full flex justify-center items-center'
                                onClick={() => {
                                  setVideoTitle(video.name)
                                  setVideoKey(video.key)
                                }}
                              >
                                <PlayIcon className='text-5xl' />
                              </a>
                            </div>
                          ))}
                          <div className='bg-navy-600 my-4 rounded-lg h-80 min-w-64 w-full flex justify-center items-center'>
                            <button
                              className='text-xl text-light-blue-200 hover:text-light-blue-400'
                              onClick={() => navigate(`/movie/${slug}/videos`)}
                            >
                              View all videos <ArrowRightIcon className='inline-block -mt-1' />
                            </button>
                          </div>
                        </>  
                      )}
                      {activeMedia === 'posters' && (
                        <>
                          {images?.posters.slice(0, 10).map((poster: { file_path: string; id: string }) => (
                            <img
                              key={poster.id}
                              className='h-80 w-full object-cover rounded-lg my-4'
                              src={`${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/${poster.file_path}`}
                              alt={movie.title}
                            />
                          ))}
                          <div className='bg-navy-600 my-4 rounded-lg h-80 min-w-48 w-full flex justify-center items-center'>
                            <button
                              className='text-xl text-light-blue-200 hover:text-light-blue-400'
                              onClick={() => navigate(`/movie/${slug}/posters`)}
                            >
                              View all posters <ArrowRightIcon className='inline-block -mt-1' />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                    <div className='flex flex-col justify-start items-start gap-4 mt-4'>
                      <h2 className='text-3xl font-bold'>Reviews: </h2>
                      {reviews.results.length > 0 ? (
                        <>
                          <div className='flex flex-col w-full max-h-96 overflow-y-auto gap-4'>
                            {reviews?.results.map((review: Review) => (
                              <ReviewComponent review={review} key={review.id} />
                            ))}
                          </div>
                        </>
                      ) : (
                        <p className='text-lg'>No reviews available</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className='flex w-1/4'>
                  <div className='flex flex-col items-start justify-start gap-2 w-full px-8'>
                    <a href={movie.homepage} target='_blank' rel='noreferrer' className='text-xl font-bold text-accent-teal hover:text-accent-teal-700'>
                      Visit official website&nbsp;
                      <ExternalLinkIcon className='text-xl inline-block -mt-2' />
                    </a>
                    <h2 className='text-xl font-bold'>Overview: </h2>
                    <p className='text-sm'>{movie.overview}</p>
                    <h2 className='text-xl font-bold'>Status: </h2>
                    <p className='text-lg'>{movie.status}</p>
                    <h2 className='text-xl font-bold'>Original Language: </h2>
                    <p className='text-lg'>{getLanguage(movie.original_language)}</p>
                    <h2 className='text-xl font-bold'>Revenue: </h2>
                    <p className='text-lg'>{movie.revenue !== 0 ? `$ ${formatCurrency(movie.revenue)}` : '-'}</p>
                    <h2 className='text-xl font-bold'>Budget: </h2>
                    <p className='text-lg'>{movie.budget !== 0 ? `$ ${formatCurrency(movie.budget)}` : '-'}</p>
                    <h2 className='text-xl font-bold mt-2'>Keywords: </h2>
                    <div className='flex flex-wrap'>
                      {keywords?.keywords.map((keyword: { id: number; name: string }) => (
                        <span key={keyword.id} className='text-md bg-navy-600 px-2 py-1 rounded-lg m-1'>
                          {keyword.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default MovieDetails
