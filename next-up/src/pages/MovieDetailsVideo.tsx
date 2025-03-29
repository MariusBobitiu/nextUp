import Loading from '@/components/layout/Loading'
import { fetchMovie, fetchVideos } from '@/lib/fetchData'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { TbArrowBarToLeft as ArrowBackIcon } from "react-icons/tb";
import VideoSelectionComponent from '@/components/VideoSelection';

const MovieDetailsVideo = () => {
    const { slug } = useParams<{ slug: string }>()
    const movieId = slug?.split('-')[0]
    console.log(movieId)

    const {data: movie } = useQuery('movie', () => fetchMovie(movieId || ''), {
        enabled: !!movieId
    })
    const {data: videos, isLoading, isError } = useQuery('videos', () => fetchVideos(movieId || ''), {
        enabled: !!movieId
    })

    if (isLoading) <Loading />
    if (isError) <div>Error fetching videos</div>

    return (
    <>
        {movie && (
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
                    <ArrowBackIcon className='inline-block -mt-1' />{" "}
                    Back to main
                </button>
            </div>
        </div>
        )}
        {videos && (
        <div className='flex flex-wrap w-full justify-center items-start'>
            <VideoSelectionComponent videos={videos.results} />
        </div>
        )}
    </>
    )
}

export default MovieDetailsVideo
