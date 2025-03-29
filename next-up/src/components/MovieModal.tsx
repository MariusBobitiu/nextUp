import { useMutation, useQuery, useQueryClient } from 'react-query'
import { IoCloseCircleOutline as CloseIcon } from 'react-icons/io5'
import placeholder from '@/assets/placeholder.jpg'
import { FaExternalLinkAlt as ExternalLink, FaBookmark as FilledBookmark, FaRegBookmark as EmptyBookmark } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import VerticalCarousel from './VerticalCarousel';
import { paragraphs } from '@/lib/consts';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/features/user/userSlice';
import { fetchUserWatchlist } from '@/lib/fetchData';
import { addToWatchlist, removeFromWatchList } from '@/lib/watchlist';

const fetchMovies = async (id: number, type: 'tv' | 'movie' | 'person') => {
  const apiUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/${type}/${id}?language=en-UK&api_key=${import.meta.env.VITE_TMDB_API_KEY}`
  console.log('Fetching movie:', apiUrl)

  const res = await fetch(apiUrl)
  if (!res.ok) {
    throw new Error('Network response was not ok: ' + res.status)
  }

  const data = await res.json()
  return data
}

const fetchWatchProviders = async (id: number, type: 'tv' | 'movie' | 'person') => {
  const apiUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/${type}/${id}/watch/providers?api_key=${import.meta.env.VITE_TMDB_API_KEY}`;
  console.log('Fetching watch providers:', apiUrl)

  const res = await fetch(apiUrl)
  if (!res.ok) {
    throw new Error('Network response was not ok: ' + res.status)
  }

  const data = await res.json()
  return data
}
const fetchCast = async (id: number, type: 'tv' | 'movie' | 'person') => {
  const apiUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/${type}/${id}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}`;
  console.log('Fetching cast:', apiUrl)

  const res = await fetch(apiUrl)
  if (!res.ok) {
    throw new Error('Network response was not ok: ' + res.status)
  }

  const data = await res.json()
  return data
}



type MovieModalProps = {
  id: number
  type: 'movie' | 'tv' | 'person'
  onClose: () => void
}

const MovieModal = ({ id, type, onClose }: MovieModalProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useSelector((state: any) => state.user.user)

  const navigate = useNavigate()
  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery(['movie', id], () => fetchMovies(id, type), {
    enabled: id !== 0,
  })

  const {data: watchlist} = useQuery({
    queryKey: ['watchlist', user?.username],
    queryFn: () => fetchUserWatchlist(user?.username),
    enabled: !!user?.username,
  })

  useEffect(() => {
    console.log('Watchlist:', watchlist)
    if (watchlist?.some((m: { movieId: number }) => m.movieId === id)) {
      console.log("Movie is bookmarked")
      setBookmarked(true)
    } else {
      console.log("Movie is not bookmarked")
      setBookmarked(false)
    }
  }, [watchlist, id])

  const {data: watchProviders} = useQuery(['watchProviders', id], () => fetchWatchProviders(id, type), {
    enabled: id !== 0 && type !== 'person',
  });
  const {data: cast} = useQuery(['cast', id], () => fetchCast(id, type), {
    enabled: id !== 0 && type !== 'person',
  });

  const addMutation = useMutation({
    mutationKey: ['addToWatchlist'],
    mutationFn: async (movieId: number) => addToWatchlist(user?.username, movieId),
    onSuccess: (data) => {
      console.log('Movie added to watchlist:', data)
      dispatch(setUser({ ...user, watchList: [...user.watchList, data] })) 
      queryClient.invalidateQueries(['watchlist', user?.username])
      setBookmarked(true)
    },
    onError: (error) => {
      console.error('Error adding movie to watchlist:', error)
      alert('Error adding movie to watchlist. Please try again.')
      queryClient.invalidateQueries(['watchlist', user?.username])
    },
  })

  const deleteMutation = useMutation({
    mutationKey: ['deleteFromWatchlist'],
    mutationFn: async (movieId: number) => removeFromWatchList(user?.username, movieId),
    onSuccess: (data) => {
      console.log('Movie removed from watchlist:', data)
      dispatch(setUser({ ...user, watchList: user.watchList.filter((m: { movieId: number }) => m.movieId !== id) })) 
      queryClient.invalidateQueries(['watchlist', user?.username])
      setBookmarked(false)
    },
    onError: (error) => {
      console.error('Error removing movie from watchlist:', error)
      alert('Error removing movie from watchlist. Please try again.')
      queryClient.invalidateQueries(['watchlist', user?.username])
    }
  })

  const onAddToWatchlist = () => {
    console.log('Added to watchlist')
    if (user) {
      if (bookmarked) {
        deleteMutation.mutate(id);
        return
      }

      console.log('Adding movie to watchlist:', id)
      addMutation.mutate(id)
    } else {
      alert("Please sign in to add to your watchlist.")
    }
  }

  useEffect(() => {
    setIsVisible(true)
  }, []);

  if (!movie || type === 'person') return null

  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50">
      <div className={`relative flex h-4/5 w-3/4 gap-2 rounded-lg bg-secondary-800 p-8 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-80'} transition-all duration-600 ease-in-out`}>
        { isLoading ? (
          <div className='size-full flex justify-center items-center'>
            <VerticalCarousel paragraphs={paragraphs} interval={2000} />
          </div>
        ) : isError ? (
          <>
          </>
        ) : (
          <>
            <div className='absolute top-0 right-2 z-10 p-2 flex items-center gap-2'>
            <button
              className='px-2 py-2 text-accent hover:text-accent-700'
              onClick={() => navigate(`/movie/${movie.id}-${movie.title.toLowerCase().replace(/ /g, '-')}`)}
            >
              More Info{" "}
              <ExternalLink className='h-4 w-4 inline -mt-1 ml-1' />
            </button>
            <button onClick={onClose} className="p-2">
              <CloseIcon className="h-6 w-6 text-primary-100 hover:text-primary-400" />
            </button>
            </div>
            <div className="relative left-0 top-0 h-full w-1/3 rounded-lg">
              <img
                src={
                  movie.poster_path
                    ? `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/${movie.poster_path}`
                    : movie.backdrop_path
                      ? `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/${movie.backdrop_path}`
                      : placeholder
                }
                alt="image placeholder"
                className="h-full w-full rounded-lg bg-center object-cover"
              />
            </div>
            <div className="relative flex w-2/3 flex-col gap-2 p-2">
              <h1 className="font-display text-4xl font-bold">{movie.title || movie.name}</h1>
              <div className='flex justify-between items-center'>
                <div className="my-2 flex flex-wrap items-center justify-start gap-1 text-sm">
                  {movie.genres.map((genre: { id: number; name: string }) => (
                    <span
                      key={genre.id}
                      className="cursor-default rounded-lg border border-accent-teal px-2 py-1 transition-colors duration-500 ease-in-out hover:bg-accent-900"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
                <button
                  className='px-2 py-2 text-accent hover:text-accent-700'
                  onClick={onAddToWatchlist}
                >
                  {bookmarked ? <FilledBookmark className='h-6 w-6' /> : <EmptyBookmark className='h-6 w-6' />}
                </button>
              </div>
              <div className="flex justify-between text-lg">
                <div className="flex flex-col">
                  <span>Rating: {movie.vote_average}⭐</span>
                  <span>({movie.vote_count} votes)</span>
                </div>
                <div className="flex flex-col text-end">
                  <span>{movie.release_date?.substring(0, 4)}</span>
                  <span className="text-primary/50">
                    {type === 'movie'
                      ? `Duration: ${movie.runtime} mins`
                      : `Total: ${movie.seasons.length} seasons`}
                  </span>
                </div>
              </div>
              <p className="text-primary-500">{movie.overview}</p>
              <div className="flex flex-col gap-1">
                {watchProviders?.results?.GB && (
                  <>
                    <div className="flex flex-col gap-1">
                      <span className="font-bold">Streaming now on:</span>
                      {watchProviders.results.GB.flatrate?.length > 0 ? (
                        <div className='flex flex-wrap gap-4'>
                        {watchProviders.results.GB.flatrate.map((provider: {provider_name: string; provider_id: number; logo_path: string}) => (
                          <a href={`https://www.themoviedb.org/${type}/${id}/watch?locale=GB`} key={provider.provider_id} target='_blank' rel='noreferrer'>
                            <img
                              src={`https://www.themoviedb.org/t/p/original${provider.logo_path}`}
                              alt={provider.provider_name}
                              className="h-12 w-12 rounded-sm"
                            />
                          </a>
                        ))}
                      </div>
                      ) : (
                        'No streaming providers available'
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                        {watchProviders.results.GB.rent?.length > 0 ? (
                          <>
                          <span className="font-bold">Available to rent:</span>
                          <div className='flex flex-wrap gap-4'>
                            {watchProviders.results.GB.rent.map((provider: {provider_name: string; provider_id: number; logo_path: string}) => (
                              <a href={`https://www.themoviedb.org/${type}/${id}/watch?locale=GB`} key={provider.provider_id} target='_blank' rel='noreferrer'>
                                <img
                                  src={`https://www.themoviedb.org/t/p/original${provider.logo_path}`}
                                  alt={provider.provider_name}
                                  className="h-12 w-12 rounded-sm"
                                />
                              </a>
                            ))}
                          </div>
                          
                          </>
                        ) : 
                          null
                        }
                    </div>
                    <div className="flex flex-col gap-1">
                      {watchProviders.results.GB.buy?.length > 0 ? (
                      <>
                        <span className="font-bold">Buy now from:</span>
                        <div className='flex flex-wrap gap-4'>
                        {watchProviders.results.GB.buy.map((provider: {provider_name: string; provider_id: number; logo_path: string}) => (
                          <a href={`https://www.themoviedb.org/${type}/${id}/watch?locale=GB`} key={provider.provider_id} target='_blank' rel='noreferrer'>
                            <img
                              src={`https://www.themoviedb.org/t/p/original${provider.logo_path}`}
                              alt={provider.provider_name}
                              className="h-12 w-12 rounded-sm"
                            />
                          </a>
                        ))}
                      </div>
                      </> 
                        ) : null
                      }
                    </div>
                    <div className='flex flex-col gap-2'>
                      <p className='text-sm'>
                        For more information in regards to pricing and availability, please visit{' '}
                          <a
                            href='https://www.justwatch.com/uk'
                            target='_blank'
                            rel='noreferrer'
                            className='text-[#fbc500]'
                          >
                            JustWatch
                          </a>.
                      </p>
                    </div>
                  </>
                )}
              </div>
                <>
                  <p className='text-lg text-primary-100'>
                    Top Billed Cast:
                  </p>
                  <div className='w-full flex flex-wrap gap-2'>
                    {cast?.cast.slice(0, 5).map((actor: { id: number; name: string; character: string; profile_path: string }) => (
                      <div key={actor.id} className='flex flex-col items-center gap-1'>
                        <img
                          src={
                            actor.profile_path
                              ? `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/${actor.profile_path}`
                              : placeholder
                          }
                          alt={actor.name}
                          className='h-16 w-16 rounded-full bg-center object-cover'
                        />
                        <span className='text-sm'>{actor.name}</span>
                        <span className='text-xs'>{actor.character}</span>
                      </div>
                    ))}
                  </div>
                </>
            </div>
          </> 
        )}
      </div>
    </div>
  )
}

export default MovieModal
