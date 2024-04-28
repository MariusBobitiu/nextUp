import { useQuery } from 'react-query'
import Loading from './layout/Loading'

const HeroSection = () => {
  const fetchPopularMovies = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_TMDB_API_BASE_URL}/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
      )
      const data = await response.json()
      return data.results
    } catch (err) {
      console.error(err)
    }
  }

  const {
    data: movies,
    isLoading,
    error,
  } = useQuery('popularMovies', fetchPopularMovies)

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    console.error(error)
    return <div>Error loading popular movies</div>
  }

  return (
    <>
      <div className="col-span-1 grid h-1/2 w-full grid-cols-2 grid-rows-6">
        <div className="col-span-2 row-span-2 rounded-lg p-2">
          <img
            src={`https://image.tmdb.org/t/p/w500${movies[0].backdrop_path}`}
            alt={movies[0].title}
            className="h-full w-full rounded-lg bg-cover bg-center object-cover"
          />
        </div>
        <div className="col-span-2 row-span-1 rounded-lg p-2">
          <img
            src={`https://image.tmdb.org/t/p/w500${movies[2].backdrop_path}`}
            alt={movies[1].title}
            className="h-full w-full rounded-lg bg-cover bg-center object-cover"
          />
        </div>
        <div className="col-span-2 row-span-1 flex items-center justify-center gap-2">
          <div className="flex-1">
            <img
              src={`https://image.tmdb.org/t/p/w500${movies[3].backdrop_path}`}
              alt={movies[2].title}
              className="h-full w-full rounded-lg bg-cover bg-center object-cover"
            />
          </div>
          <div className="flex-1">
            <img
              src={`https://image.tmdb.org/t/p/w500${movies[4].backdrop_path}`}
              alt={movies[3].title}
              className="h-full w-full rounded-lg bg-cover bg-center object-cover"
            />
          </div>
        </div>
        <div className="col-span-2 row-span-2 rounded-lg p-2">
          <img
            src={`https://image.tmdb.org/t/p/w500${movies[5].backdrop_path}`}
            alt={movies[4].title}
            className="h-full w-full rounded-lg bg-cover bg-center object-cover"
          />
        </div>
      </div>
      <div className="col-span-1 grid h-1/2 w-full grid-cols-3 grid-rows-5">
        <div className="col-span-2 row-span-2 p-2">
          <img
            src={`https://image.tmdb.org/t/p/w500${movies[6].backdrop_path}`}
            alt={movies[6].title}
            className="h-full w-full rounded-lg bg-cover bg-center object-cover"
          />
        </div>
        <div className="col-span-1 row-span-2 p-2">
          <img
            src={`https://image.tmdb.org/t/p/w500${movies[7].poster_path}`}
            alt={movies[7].title}
            className="h-full w-full rounded-lg bg-cover bg-center "
          />
        </div>
        <div className="col-span-1 row-span-2 p-2">
          <img
            src={`https://image.tmdb.org/t/p/w500${movies[8].backdrop_path}`}
            alt={movies[8].title}
            className="h-full w-full rounded-lg bg-cover bg-center object-cover"
          />
        </div>
        <div className="col-span-2 row-span-2 p-2">
          <img
            src={`https://image.tmdb.org/t/p/w500${movies[9].poster_path}`}
            alt={movies[9].title}
            className="h-full w-full rounded-lg bg-cover bg-center"
          />
        </div>
        <div className="col-span-2 row-span-1 p-2">
          <img
            src={`https://image.tmdb.org/t/p/w500${movies[10].backdrop_path}`}
            alt={movies[10].title}
            className="h-full w-full rounded-lg bg-cover bg-center object-cover"
          />
        </div>
        <div className="col-span-1 row-span-1 p-2">
          <img
            src={`https://image.tmdb.org/t/p/w500${movies[11].poster_path}`}
            alt={movies[11].title}
            className="h-full w-full rounded-lg bg-cover bg-center"
          />
        </div>
      </div>
      <div className="col-span-1 grid h-1/2 w-full grid-cols-2 grid-rows-6">
        <div className="col-span-2 row-span-2 p-2">
          <img
            src={`https://image.tmdb.org/t/p/w500${movies[19].backdrop_path}`}
            alt={movies[12].title}
            className="h-full w-full rounded-lg bg-cover bg-center object-cover"
          />
        </div>
        <div className="col-span-1 row-span-1 p-2">
          <img
            src={`https://image.tmdb.org/t/p/w500${movies[13].backdrop_path}`}
            alt={movies[13].title}
            className="h-full w-full rounded-lg bg-cover bg-center object-cover"
          />
        </div>
        <div className="col-span-1 row-span-1 p-2">
          <img
            src={`https://image.tmdb.org/t/p/w500${movies[14].backdrop_path}`}
            alt={movies[14].title}
            className="h-full w-full rounded-lg bg-cover bg-center object-cover"
          />
        </div>
        <div className="col-span-2 row-span-1 p-2">
          <img
            src={`https://image.tmdb.org/t/p/w500${movies[16].backdrop_path}`}
            alt={movies[14].title}
            className="h-full w-full rounded-lg bg-cover bg-center object-cover"
          />
        </div>
        <div className="col-span-2 row-span-2 p-2">
          <img
            src={`https://image.tmdb.org/t/p/w500${movies[17].backdrop_path}`}
            alt={movies[15].title}
            className="h-full w-full rounded-lg bg-cover bg-center object-cover"
          />
        </div>
      </div>
    </>
  )
}

export default HeroSection
