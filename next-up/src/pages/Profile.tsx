import { userState } from '@/types/Auth'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { MovieProps } from '@/types/MovieCard'
import { useQuery } from 'react-query'
import Loading from '@/components/layout/Loading'
import { fetchUserWatchlist } from '@/lib/fetchData'
import { FaBookmark as FilledBookmark } from 'react-icons/fa'

const Profile = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const user = useSelector((state: userState) => state.user.user)

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true)
    }
    // console.log(user)
  }, [user])

  const {
    data: watchList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['watchList', user?.username],
    queryFn: async () => fetchUserWatchlist(user?.username),
    enabled: !!user?.username,
  })

  if (isLoading) return <Loading />

  if (error) return <h1>Error</h1>

  console.log('Movies in watchlist', watchList)

  return (
    <>
      {isAuthenticated ? (
        <div className="flex size-full">
          <div className="container mx-auto flex h-full flex-col items-start justify-normal gap-2">
            <div className="flex w-full items-center justify-between gap-12 rounded-lg bg-gradient-to-b from-secondary-500 to-secondary-700 px-12 py-8">
              <div className="flex items-center justify-center">
                <img
                  src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
                  alt="profile"
                  className="h-32 w-32 rounded-full"
                />
                <div className="ml-4">
                  <h1 className="text-2xl text-primary-200">{user?.username}</h1>
                  <small className="text-sm">{user?.email}</small>
                  <p className="text-lg">
                    Member since{' '}
                    {new Date(user?.createdAt).toLocaleDateString('en-GB')}
                  </p>
                </div>
              </div>
              <div className="mr-4">
                <h3 className="flex items-center gap-2 text-2xl text-primary-200">
                  <FilledBookmark className="inline-block size-6 text-accent" />
                  WatchList
                </h3>
                <p className="text-lg">
                  You have <b>{watchList.length}</b> movies in your watchlist
                </p>
              </div>
            </div>
            <h1 className="w-full text-3xl text-primary-200">Your WatchList</h1>
            <div className="flex w-full h-3/4 flex-col items-start justify-normal gap-4 overflow-auto p-4">
              {watchList?.length === 0 ? (
                <div className='size-full flex flex-col justify-center items-center gap-2'>
                  <h1 className="text-4xl text-primary-200">
                    Your watchlist is empty
                  </h1>
                  <p className="text-lg">
                    Add movies to your watchlist to see them here.
                  </p>
                  <p className="text-lg">
                    Go to the <a href='/categories' className='text-accent'>Movies</a> page to add movies to your watchlist.
                  </p>
                </div>
              ) : 
                watchList?.map((movie: MovieProps) => (
                  <a
                    href={`/movie/${movie.movieId}`}
                    key={movie.movieId}
                    className="relative flex h-64 w-full items-center justify-start gap-4 rounded-lg px-12 py-4"
                  >
                    <div className="pointer-events-none absolute left-0 top-0 z-0 h-full w-full">
                      <img
                        src={`${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/${movie.backdrop_path}`}
                        alt={movie.title}
                        className="pointer-events-none h-full w-full rounded-lg object-cover object-top opacity-40"
                      />
                    </div>
                    <img
                      src={`${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/${movie.poster_path}`}
                      alt={movie.title}
                      className="z-10 h-full rounded-lg"
                    />
                    <div className="z-10 ml-4 flex h-full flex-col items-start justify-normal gap-2">
                      <div className="flex w-full items-center justify-between py-2">
                        <h1 className="text-2xl">{movie.title}</h1>
                        <p className="text-lg">
                          Release Date:{' '}
                          {new Date(movie.release_date).toLocaleDateString(
                            'en-GB'
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-lg">
                          Rating: {movie.vote_average} ⭐️
                        </p>
                        <p className="text-lg">({movie.vote_count} votes)</p>
                      </div>
                      <p className="mb-2 line-clamp-3">{movie.overview}</p>
                      <p className="flex items-center gap-2">
                        {movie.genres?.map((genre) => (
                          <span
                            key={genre.id}
                            className="rounded-lg border bg-secondary-800/50 px-2 py-1 backdrop-blur-xl"
                          >
                            {genre.name}
                          </span>
                        ))}
                      </p>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <h1>Not authenticated</h1>
      )}
    </>
  )
}

export default Profile
