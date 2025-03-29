import Loading from '@/components/layout/Loading'
import { useEffect, useState } from 'react'
import { PiArrowFatLinesRightFill as ArrowRightIcon } from 'react-icons/pi'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import {
  FaBookmark as FilledBookmark,
  FaRegBookmark as EmptyBookmark,
  FaExternalLinkAlt as ExternalLinkIcon,
  FaPlay as PlayIcon,
} from 'react-icons/fa'
import {
  fetchMovie,
  fetchReleaseDateGB,
  fetchCredits,
  fetchKeywords,
  fetchImages,
  fetchVideos,
  fetchReviews,
  fetchSimilarMovies,
  fetchRecommendations,
  fetchUserWatchlist,
} from '@/lib/fetchData'
import MoviePlayerModal from '@/components/MoviePlayerModal'
import { formatCurrency, getLanguage } from '@/lib/utils'
import ReviewComponent from '@/components/ReviewComponent'
import { Review } from '@/types/MovieDetails'
import { useDispatch, useSelector } from 'react-redux'
import { addToWatchlist, removeFromWatchList } from '@/lib/watchlist'
import { setUser } from '@/features/user/userSlice'

const MovieDetails = () => {
  const { slug } = useParams()
  const [movieId, setMovieId] = useState('')
  const [bookmarked, setBookmarked] = useState(true)
  const [activeMedia, setActiveMedia] = useState('images')
  const [videoTitle, setVideoTitle] = useState('')
  const [videoKey, setVideoKey] = useState('')
  const [activeSection, setActiveSection] = useState('similar')

  const queryClient = useQueryClient();
  const dispatch = useDispatch()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useSelector((state: any) => state.user.user)

  useEffect(() => {
    console.log("movieId: ", movieId)
  }, [movieId])

  const navigate = useNavigate()

  useEffect(() => {
    setMovieId(slug?.split('-')[0] || '')
  }, [slug])

  const {
    data: watchlist,
  } = useQuery({
    queryKey: ['watchlist'],
    queryFn: async () => fetchUserWatchlist(user?.username),
    enabled: !!user?.username,
  });

  useEffect(() => {
    if (watchlist?.some((movie: { movieId: number }) => movie?.movieId === parseInt(movieId))) {
      console.log("Movie is in watchlist ", watchlist)
      console.log("MovieId: ", movieId)
      setBookmarked(true)
    } else {
      console.log("Movie is not in watchlist", watchlist)
      console.log("MovieId: ", movieId)
      setBookmarked(false)
    }
  }, [watchlist, movieId])

  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery('movie', () => fetchMovie(movieId || ''), {
    enabled: !!movieId,
  })
  const { data: releaseDate } = useQuery(
    'releaseDate',
    () => fetchReleaseDateGB(movieId || ''),
    {
      enabled: !!movieId,
    }
  )
  const { data: credits } = useQuery(
    'credits',
    () => fetchCredits(movieId || ''),
    {
      enabled: !!movieId,
    }
  )
  const { data: keywords } = useQuery(
    'keywords',
    () => fetchKeywords(movieId || ''),
    {
      enabled: !!movieId,
    }
  )
  const { data: images } = useQuery(
    'images',
    () => fetchImages(movieId || ''),
    {
      enabled: !!movieId,
    }
  )
  const { data: videos } = useQuery(
    'videos',
    () => fetchVideos(movieId || ''),
    {
      enabled: !!movieId,
    }
  )
  const { data: reviews } = useQuery(
    'reviews',
    () => fetchReviews(movieId || ''),
    {
      enabled: !!movieId,
    }
  )
  const { data: similarMovies } = useQuery(
    'similarMovies',
    () => fetchSimilarMovies(movieId || ''),
    {
      enabled: !!movieId,
    }
  )
  const { data: recommendations } = useQuery(
    'recommendations',
    () => fetchRecommendations(movieId || ''),
    {
      enabled: !!movieId,
    }
  )

  const trailer = videos?.results.find(
    (video: { type: string }) => video.type === 'Trailer'
  )

  const formatDuration = () => {
    const hours = Math.floor(movie.runtime / 60)
    const minutes = movie.runtime % 60
    return `${hours}h ${minutes}m`
  }

  const addMutation = useMutation({
    mutationKey: ['addToWatchlist', user?.username],
    mutationFn: async () => addToWatchlist(user?.username, parseInt(movieId)),
    onSuccess: (data) => {
      setBookmarked(true)
      dispatch(setUser({...user, watchlist: [...user.watchlist, data]}))
      console.log('Movie added to watchlist:', data)
      queryClient.invalidateQueries(['watchlist', user?.username])
    },
    onError: (error) => {
      console.error('Error adding movie to watchlist:', error)
      alert('Error adding movie to watchlist')
      queryClient.invalidateQueries(['watchlist', user?.username])
    }
  })

  const deleteMutation = useMutation({
    mutationKey: ['deleteFromWatchlist', user?.username],
    mutationFn: async () => removeFromWatchList(user?.username, parseInt(movieId)),
    onSuccess: (data) => {
      setBookmarked(false)
      console.log('Movie removed from watchlist:', data)
      watchlist?.splice(
        watchlist?.findIndex((movie: { movieId: number }) => movie.movieId === parseInt(movieId)),
        1
      )
      dispatch(setUser({...user, watchList: watchlist}))
      console.log("User after removing movie from watchlist: ", user)
      console.log("Watchlist after removing movie from watchlist: ", watchlist)
      console.log("MovieId: ", movieId)
      console.log("User: ", user)
      queryClient.invalidateQueries(['watchlist', user?.username])
    },
    onError: (error) => {
      console.error('Error removing movie from watchlist:', error)
      alert('Error removing movie from watchlist')
      queryClient.invalidateQueries(['watchlist', user?.username])
    }
  })

  const toggleWatchList = () => {
    if (bookmarked) {
      deleteMutation.mutate();
    } else {
      addMutation.mutate();
    }
  }

  if (isLoading) return <Loading />
  if (isError) return <div>Error fetching movie details</div>

  return (
    <>
      <div className="relative w-full px-12">
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
            <div className="absolute left-0 top-0 z-10 h-96 w-full bg-gradient-to-r from-secondary-800 via-secondary-800/40 to-secondary-800"></div>
            <div className="relative z-10 flex w-full flex-col items-start justify-center">
              <div className="flex w-full items-center justify-between p-12 pt-24">
                <div className="flex justify-center relative">
                  <img
                    className="h-80 w-52 rounded-lg object-cover shadow-lg"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                </div>
                <button
                  className="absolute right-2 top-2 px-2 py-2 text-accent hover:text-accent-700"
                  onClick={toggleWatchList}
                >
                  {bookmarked ? (
                    <FilledBookmark className="h-10 w-10" />
                  ) : (
                    <EmptyBookmark className="h-10 w-10" />
                  )}
                </button>
                <div className="flex w-2/3 flex-col items-end justify-center gap-2">
                  <h1 className="text-center text-4xl font-bold">
                    {movie.title} ({movie.release_date.slice(0, 4)})
                  </h1>
                  <p className="-mt-2 mb-2 text-center text-primary-400">
                    {movie.tagline ? movie.tagline : 'No tagline'}
                  </p>
                  <div className="flex w-full items-center justify-end gap-2">
                    {releaseDate?.results?.find(
                      (result: { iso_3166_1: string }) =>
                        result.iso_3166_1 === 'GB'
                    )?.release_dates[0].release_date ? (
                      <p className="flex gap-2 text-xl">
                        {releaseDate?.results.find(
                          (result: { iso_3166_1: string }) =>
                            result.iso_3166_1 === 'GB'
                        )?.release_dates[0].certification ? (
                          <span className="border border-primary-300 px-1">
                            {
                              releaseDate?.results?.find(
                                (result: { iso_3166_1: string }) =>
                                  result.iso_3166_1 === 'GB'
                              )?.release_dates[0].certification
                            }
                          </span>
                        ) : null}
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
                      null
                    )}
                    {movie.genres.slice(0,6).map(
                      (genre: { id: number; name: string }, index: number) => (
                        <span
                          key={genre.id}
                          className="text-lg text-primary-300"
                        >
                          {genre.name}
                          {index < movie.genres.length - 1 ? ', ' : ''}
                        </span>
                      )
                    )}
                    <span>●</span>
                    <p className="text-lg">{formatDuration()}</p>
                  </div>
                  <a
                    href={`#player-${trailer?.key}-${trailer?.name}`}
                    rel="noreferrer"
                    className="text-xl text-accent hover:text-accent-600 transition-all ease-in-out duration-300"
                    onClick={() => {
                      setVideoTitle(trailer?.name)
                      setVideoKey(trailer?.key)
                    }}
                  >
                    <PlayIcon className="-mt-1 mr-2 inline-block text-lg" />
                    Watch trailer
                  </a>
                </div>
              </div>
              <div className="mb-20 flex w-full items-start justify-between gap-2 p-4 pt-0">
                <div className="w-3/4">
                  <h2 className="mb-4 text-3xl font-bold">Top Billed Cast: </h2>
                  <div className="max-w-4/5 flex items-start justify-start gap-4 overflow-x-auto pb-4">
                    {credits?.cast
                      .slice(0, 10)
                      .map(
                        (actor: {
                          id: number
                          name: string
                          profile_path: string
                          character: string
                        }) => (
                          <div
                            key={actor.id}
                            className="flex h-80 min-w-40 flex-col items-center gap-1 rounded-lg bg-secondary-700 pb-2"
                          >
                            <img
                              className="h-3/4 w-full rounded-t-lg object-cover"
                              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                              alt={actor.name}
                            />
                            <div className='w-full h-1/4 flex flex-col items-center justify-center'>
                              <p className="text-md px-2 text-center font-bold">
                                {actor.name}
                              </p>
                              <p className="text-sm">{actor.character}</p>
                            </div>
                          </div>
                        )
                      )}
                    <div className="flex h-80 min-w-40 flex-col items-center justify-start gap-1">
                      <button
                        className="flex min-h-full min-w-40 flex-col items-center justify-center rounded-lg bg-secondary-700 p-2"
                        onClick={() => navigate(`/movie/${slug}/cast`)}
                      >
                        <span className="text-md text-center font-bold">
                          View More{' '}
                          <ArrowRightIcon className="-mt-1 inline-block" />
                        </span>
                      </button>
                    </div>
                  </div>
                  <button
                    className="py-4 text-lg font-semibold"
                    onClick={() => navigate(`/movie/${slug}/cast`)}
                  >
                    See full cast and crew{' '}
                    <ArrowRightIcon className="-mt-1 inline-block" />
                  </button>
                  <div className="mt-8 flex w-full flex-col">
                    <div className="flex gap-6 text-xl">
                      <h2 className="mr-16 text-3xl font-bold">Media </h2>
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
                    <div className="flex items-start justify-start gap-4 overflow-x-auto py-2">
                      {activeMedia === 'images' && (
                        <>
                          {images?.backdrops
                            .slice(0, 5)
                            .map((image: { file_path: string; id: string }) => (
                              <img
                                key={image.id}
                                className="my-4 h-80 min-w-[30rem] rounded-lg object-cover"
                                src={`${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/${image.file_path}`}
                                alt={movie.title}
                              />
                            ))}
                          <div className="my-4 flex h-80 w-full min-w-64 items-center justify-center rounded-lg bg-secondary-700">
                            <button
                              className="text-xl text-primary-200 hover:text-primary-400"
                              onClick={() => navigate(`/movie/${slug}/images`)}
                            >
                              View all images{' '}
                              <ArrowRightIcon className="-mt-1 inline-block" />
                            </button>
                          </div>
                        </>
                      )}
                      {activeMedia === 'videos' && (
                        <>
                          {videos?.results
                            .slice(0, 5)
                            .map(
                              (video: {
                                key: string
                                id: string
                                name: string
                              }) => (
                                <div
                                  className={`relative my-4 h-80 min-w-[30rem] rounded-lg`}
                                >
                                  <img
                                    className="h-full w-full rounded-lg object-cover"
                                    src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
                                    alt={movie.title}
                                  />
                                  <a
                                    href={`#player-${video.id}-${video.name}`}
                                    rel="noreferrer"
                                    className="absolute left-0 top-0 flex h-full w-full items-center justify-center text-primary-200 hover:text-accent"
                                    onClick={() => {
                                      setVideoTitle(video.name)
                                      setVideoKey(video.key)
                                    }}
                                  >
                                    <PlayIcon className="text-5xl" />
                                  </a>
                                </div>
                              )
                            )}
                          <div className="my-4 flex h-80 w-full min-w-64 items-center justify-center rounded-lg bg-secondary-700">
                            <button
                              className="text-xl text-primary-200 hover:text-primary-400"
                              onClick={() => navigate(`/movie/${slug}/videos`)}
                            >
                              View all videos{' '}
                              <ArrowRightIcon className="-mt-1 inline-block" />
                            </button>
                          </div>
                        </>
                      )}
                      {activeMedia === 'posters' && (
                        <>
                          {images?.posters
                            .slice(0, 10)
                            .map(
                              (poster: { file_path: string; id: string }) => (
                                <img
                                  key={poster.id}
                                  className="my-4 h-80 w-full rounded-lg object-cover"
                                  src={`${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/${poster.file_path}`}
                                  alt={movie.title}
                                />
                              )
                            )}
                          <div className="my-4 flex h-80 w-full min-w-48 items-center justify-center rounded-lg bg-secondary-700">
                            <button
                              className="text-xl text-primary-200 hover:text-primary-400"
                              onClick={() => navigate(`/movie/${slug}/posters`)}
                            >
                              View all posters{' '}
                              <ArrowRightIcon className="-mt-1 inline-block" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="mt-8 flex flex-col items-start justify-start gap-4">
                      <h2 className="text-3xl font-bold">Reviews: </h2>
                      {reviews?.results.length > 0 ? (
                        <>
                          <div className="flex max-h-96 w-full flex-col gap-4 overflow-y-auto">
                            {reviews?.results.map((review: Review) => (
                              <ReviewComponent
                                review={review}
                                key={review.id}
                              />
                            ))}
                          </div>
                        </>
                      ) : (
                        <p className="text-lg">No reviews available</p>
                      )}
                    </div>
                    <div className="mt-8 flex flex-col gap-4">
                      <div className="flex items-center justify-start gap-8">
                        <button
                          className={`text-3xl font-medium hover:text-primary-50 ${activeSection === 'similar' ? 'border-b border-accent-teal' : ''}`}
                          onClick={() => setActiveSection('similar')}
                        >
                          Similar Movies
                        </button>
                        <button
                          className={`text-3xl font-medium hover:text-primary-50 ${activeSection === 'recommendations' ? 'border-b border-accent-teal' : ''}`}
                          onClick={() => setActiveSection('recommendations')}
                        >
                          Recommendations
                        </button>
                      </div>
                      <div className="flex w-full items-center justify-start gap-4 overflow-x-auto">
                        {activeSection === 'similar' &&
                          similarMovies?.results.map(
                            (movie: {
                              id: number
                              backdrop_path: string
                              title: string
                              release_date: string
                              vote_average: number
                            }) => (
                              <a
                                key={movie.id}
                                href={`/movie/${movie.id}-${movie.title.toLowerCase().split(' ').join('-')}`}
                                rel="noreferrer"
                                className="flex min-w-96 flex-col items-start justify-start rounded-lg pb-2"
                                // onClick={() =>
                                //   navigate(
                                //     `/movie/${movie.id}-${movie.title.toLowerCase().split(' ').join('-')}`
                                //   )
                                // }
                              >
                                <img
                                  className="h-52 w-96 rounded-lg object-cover"
                                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                                  alt={movie.title}
                                />
                                <div className="flex w-full items-center justify-between gap-2 px-2">
                                  <h3 className="text-lg font-bold truncate">
                                    {movie.title}
                                  </h3>
                                  <p className="text-sm text-nowrap">
                                    <span className='inline-block mr-1'>
                                      ⭐
                                    </span>
                                    {movie.vote_average}
                                  </p>
                                </div>
                              </a>
                            )
                          )}
                        {activeSection === 'recommendations' &&
                          recommendations?.results.map(
                            (movie: {
                              id: number
                              backdrop_path: string
                              title: string
                              release_date: string
                              vote_average: number
                            }) => (
                              <a
                                key={movie.id}
                                href={`/movie/${movie.id}-${movie.title.toLowerCase().split(' ').join('-')}`}
                                rel="noreferrer"
                                className="flex min-w-96 flex-col items-start justify-start rounded-lg pb-2 cursor-pointer"
                                // onClick={() =>
                                //   navigate(
                                //     `/movie/${movie.id}-${movie.title.toLowerCase().split(' ').join('-')}`
                                //   )
                                // }
                              >
                                <img
                                  className="h-52 w-96 rounded-lg object-cover"
                                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                                  alt={movie.title}
                                />
                                <div className="flex w-full items-center justify-between gap-2 px-2">
                                  <h3 className="text-lg font-bold truncate">
                                    {movie.title}
                                  </h3>
                                  <p className="text-sm text-nowrap">
                                    <span className='inline-block mr-1'>
                                      ⭐ 
                                    </span>
                                    {movie.vote_average}
                                  </p>
                                </div>
                              </a>
                            )
                          )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex w-1/4">
                  <div className="flex w-full flex-col items-start justify-start gap-2 px-8">
                    <a
                      href={movie.homepage}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xl font-bold text-accent hover:text-accent-700"
                    >
                      Visit official website&nbsp;
                      <ExternalLinkIcon className="-mt-2 inline-block text-xl" />
                    </a>
                    <h2 className="text-xl font-bold">Overview: </h2>
                    <p className="text-sm">{movie.overview}</p>
                    <h2 className="text-xl font-bold">Status: </h2>
                    <p className="text-lg">{movie.status}</p>
                    <h2 className="text-xl font-bold">Original Language: </h2>
                    <p className="text-lg">
                      {getLanguage(movie.original_language)}
                    </p>
                    <h2 className="text-xl font-bold">Revenue: </h2>
                    <p className="text-lg">
                      {movie.revenue !== 0
                        ? `$ ${formatCurrency(movie.revenue)}`
                        : '-'}
                    </p>
                    <h2 className="text-xl font-bold">Budget: </h2>
                    <p className="text-lg">
                      {movie.budget !== 0
                        ? `$ ${formatCurrency(movie.budget)}`
                        : '-'}
                    </p>
                    <h2 className="mt-2 text-xl font-bold">Keywords: </h2>
                    <div className="flex flex-wrap">
                      {keywords?.keywords.map(
                        (keyword: { id: number; name: string }) => (
                          <span
                            key={keyword.id}
                            className="text-md m-1 rounded-lg bg-secondary-700 px-2 py-1"
                          >
                            {keyword.name}
                          </span>
                        )
                      )}
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
