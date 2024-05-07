import Loading from '@/components/layout/Loading'
import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

const MovieDetails = () => {
  const { slug } = useParams()
  const movieId = slug?.split('-').reverse().pop()
  console.log(movieId)

  const fetchMovie = async () => {
    const apiUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/movie/${movieId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
    console.log('Fetching movie details from:', apiUrl)

    const res = await fetch(apiUrl)
    if (!res.ok) {
      throw new Error('Network response was not ok ' + res.status)
    }

    const data = await res.json()
    return data
  }
  const fetchReleaseDateGB = async () => {
    const apiUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/movie/${movieId}/release_dates?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
    console.log('Fetching movie release dates from:', apiUrl)

    const res = await fetch(apiUrl)
    if (!res.ok) {
      throw new Error('Network response was not ok ' + res.status)
    }

    const data = await res.json()
    return data
  }

  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery('movie', fetchMovie, {
    enabled: !!movieId,
  })
  const { data: releaseDate } = useQuery('releaseDates', fetchReleaseDateGB, {
    enabled: !!movieId,
  })

  if (isLoading) return <Loading />
  if (isError) return <div>Error fetching movie details</div>

  return (
    <>
      <div className="container relative mx-auto px-12">
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
            <div className="relative z-10 flex flex-col items-start justify-center">
              <div className="flex w-full items-center justify-between p-12 pt-24">
                <div className="flex justify-center">
                  <img
                    className="h-80 w-52 rounded-lg object-cover shadow-lg"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                </div>
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
                      <p className="mr-4 flex gap-2 text-xl">
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
                      </p>
                    ) : (
                      <span className="text-lg">Release date unknown</span>
                    )}
                    {movie.genres.map((genre: { id: number; name: string }) => (
                      <span
                        key={genre.id}
                        className="rounded-lg border border-accent-teal px-2 py-1 text-center text-lg"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-center text-lg">{movie.overview}</p>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default MovieDetails
