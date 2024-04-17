import React from 'react';
import Image from 'next/image';
import getGenre from '~/app/lib/getGenre';

type MovieCardProps = {
    title: string;
    overview: string;
    backdrop_path: string;
    genre_ids: number[];
}

const MovieCard = ({title, overview, backdrop_path, genre_ids} : MovieCardProps) => {
    const originalURL = 'https://image.tmdb.org/t/p/original/'

    return (
        <div className='w-[300px] h-full min-h-[450px] rounded-lg flex flex-col relative bg-navy-700 border border-accent-teal-800/25'>
            <div className='relative top-0 left-0 w-full h-3/5 rounded-t-lg'>
                <Image src={`${originalURL}/${backdrop_path}`} layout='fill' objectFit='cover' alt='image placeholder' className='brightness-[0.70] rounded-t-lg' />
                <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-t from-navy-700 to-transparent rounded-t-lg' />
            </div>
            <div className='z-10 h-2/3 absolute bottom-2 left-0 p-4'>
                <h1 className='text-3xl -mt-4 font-extrabold font-display'>{title}</h1>
                <div className='flex justify-start items-center my-2 gap-1 flex-wrap text-xs'>
                    {genre_ids.map((genre, index) => (
                        <span key={index} className='border border-accent-teal-900 px-2 py-1 rounded-lg'>{getGenre(genre)}</span>
                    ))}
                </div>
                <p className='text-sm py-4'>
                    {overview}
                </p>
            </div>
        </div>
    )
}

export default MovieCard;