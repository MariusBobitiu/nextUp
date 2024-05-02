import { userState } from '@/types/Auth'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { MovieProps } from '@/types/MovieCard'
import { useQuery } from 'react-query'
import Loading from '@/components/layout/Loading'

const Profile = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const user = useSelector((state: userState) => state.user.user)

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true)
    }
    console.log(user)
  }, [user])

  const getWatchList = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SV_API_BASE_URL}/movies/${user.username}/watchlist`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const data = await res.json()
      console.log(data)
      return data.watchList
    } catch (error) {
      console.log(error)
      return error
    }
  }

  const {
    data: watchList,
    isLoading,
    error,
  } = useQuery('watchList', getWatchList, {
    enabled: isAuthenticated,
  })

  if (isLoading) return <Loading />

  if (error) return <h1>Error</h1>

  return (
    <>
      {isAuthenticated ? (
        <div className="flex h-[90%] w-full flex-col items-center justify-center gap-4 px-12">
          <div className="flex w-full items-center justify-between gap-12 rounded-lg bg-gradient-to-br from-navy-600 to-navy-400 px-12 py-8">
            <div className="flex items-center justify-center">
              {user.profilePicture !== '' ? (
                <img
                  src={user.profilePicture}
                  alt="profile"
                  className="h-32 w-32 rounded-full"
                />
              ) : (
                <img
                  src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
                  alt="profile"
                  className="h-32 w-32 rounded-full"
                />
              )}
              <div className="ml-4">
                <h1 className="text-2xl text-light-blue-200">
                  {user.username}
                </h1>
                <small className="text-sm">{user.email}</small>
                <p className="text-lg">
                  Member since{' '}
                  {new Date(user.createdAt).toLocaleDateString('en-GB')}
                </p>
              </div>
            </div>
            <div className="mr-4">
              <h3 className="text-2xl text-light-blue-200">WatchList</h3>
              <p className="text-lg">
                You have {user.watchList.length} movies in your watchlist
              </p>
            </div>
          </div>
          <div className="flex h-3/4 flex-col items-center justify-start gap-4 overflow-auto p-8">
            {watchList?.map((movie: MovieProps) => (
              <div
                key={movie.id}
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
                <div className="z-10 ml-4 flex h-full flex-col items-start justify-start">
                  <h1 className="text-2xl">{movie.title}</h1>
                  <p className="text-lg">{movie.overview}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h1>Not authenticated</h1>
      )}
    </>
  )
}

export default Profile
