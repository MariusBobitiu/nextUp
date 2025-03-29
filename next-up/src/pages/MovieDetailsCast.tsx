import Loading from "@/components/layout/Loading"
import { useQuery } from "react-query"
import { fetchMovie, fetchCredits } from '@/lib/fetchData'
import { useParams } from "react-router-dom"
import placeholder from '@/assets/userPlaceholder.png'
import CrewList from "@/components/CrewList"
import { TbArrowBarToLeft as ArrowBackIcon } from "react-icons/tb";

const MovieDetailsCast = () => {
    const { slug } = useParams()
    const movieId = slug?.split('-').reverse().pop()
    console.log("Movie ID: ", movieId)

    const { data: movie, isLoading, isError } = useQuery('movie', () => fetchMovie(movieId || ''), {
        enabled: !!movieId,
    })
    const {data: credits} = useQuery('credits', () => fetchCredits(movieId || ''), {
        enabled: !!movieId,
    })

    if (isLoading) return <Loading />
    if (isError) return <div className="w-full text-center">Error fetching movie cast!</div>

    return (
    <>
        <div className='container mx-auto px-12 py-4 flex flex-col gap-8'>
            <div className='w-full flex justify-start items-center gap-8 bg-secondary-700 rounded-lg px-12 py-4'>
                {movie.poster_path && (
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className='w-24 h-40 rounded-lg object-cover shadow-lg'
                    />
                )}
                <div className='flex flex-col justify-center items-start gap-2'>
                    <h1 className='text-5xl font-bold'>
                        {movie.title}
                        {" "}
                        <span className='font-normal'>
                            ({movie.release_date.slice(0, 4)})
                        </span>
                    </h1>
                    <button
                        className="font-semibold py-2 pr-4 text-xl hover:text-primary-500"
                        onClick={() => window.location.replace(`/movie/${movieId}-${movie.title.toLowerCase().split(' ').join('-')}`)}
                    >
                        <ArrowBackIcon className='inline-block -mt-1' /> Back to main
                    </button>
                </div>
            </div>
            <div className='flex justify-between items-start w-full'>
                <div className='w-1/2 flex flex-col items-start gap-4 px-4'>
                <h3 className='text-3xl font-semibold'>Cast ● <span className='text-3xl font-light'>
                    {credits.cast.length}</span></h3>
                    <div className="grid grid-cols-2 gap-2 w-full">
                        {credits.cast.map((actor: {id: number; profile_path: string; name: string; character: string;}) => (
                            <div key={actor.id} className='flex items-center'>
                                <img
                                    src={actor.profile_path != null ? `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/${actor.profile_path}` : placeholder}
                                    alt={actor.name}
                                    className='w-20 h-20 rounded-xl object-cover'
                                />
                                <div className='ml-4'>
                                    <h2 className='text-lg font-semibold'>{actor.name}</h2>
                                    <p className='text-sm'>{actor.character}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='w-1/2 flex flex-col items-start gap-4 px-4'>
                    <h3 className='text-3xl font-semibold'>Crew ● <span className='text-3xl font-light'>{credits.crew.length}</span></h3>
                    <CrewList crew={credits.crew} />
                </div>
            </div>
        </div>
    </>
  )
}

export default MovieDetailsCast
