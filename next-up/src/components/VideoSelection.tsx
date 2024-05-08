import categorizeVideosByType from '@/services/CategorizeVideosByType';
import React, { useState, useEffect } from 'react';
import { Video } from '@/types/MovieDetails';
import { FaPlay as PlayIcon } from 'react-icons/fa';
import MoviePlayerModal from './MoviePlayerModal';

const VideoSelectionComponent: React.FC<{ videos: Video[] }> = ({ videos }) => {
    const [selectedType, setSelectedType] = useState<string>('');
    const [videoMap, setVideoMap] = useState<Map<string, Video[]>>(new Map());
    const [videoTitle, setVideoTitle] = useState<string>('');
    const [videoKey, setVideoKey] = useState<string>('');

    useEffect(() => {
        const map = categorizeVideosByType(videos);
        setVideoMap(map);
        const firstType = Array.from(map.keys())[0];
        setSelectedType(firstType);
    }, [videos]);

    return (
        <div className='w-full px-12 mb-20'>
        <MoviePlayerModal videoTitle={videoTitle} videoKey={videoKey} setVideoTitle={setVideoTitle} setVideoKey={setVideoKey} />
        <div className="flex justify-start items-center gap-8 text-3xl my-8">
        {Array.from(videoMap.keys()).map(type => (
            <button key={type} onClick={() => setSelectedType(type)} className={`hover:text-light-blue-500 ${selectedType === type ? 'border-b border-accent-teal' : ''}`}>
            {type} ({videoMap.get(type)?.length})
            </button>
        ))}
        </div>
        <div className="flex flex-col items-start justify-start gap-4">
        {videoMap.get(selectedType)?.map(video => (
            <div className={`relative h-80 flex gap-8 w-full rounded-lg my-4 bg-navy-600 p-4`} key={video.id}>
                <img
                    className='h-full w-1/3 object-cover rounded-lg'
                    src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
                    alt={video.name}
                />
                <a
                    href={`#player-${video.id}`}
                    rel='noreferrer'
                    className='absolute top-0 left-0 text-light-blue-200 hover:text-accent-teal w-1/3 h-full flex justify-center items-center'
                    onClick={() => {
                        setVideoTitle(video.name)
                        setVideoKey(video.key)
                    }}
                >
                    <PlayIcon className='text-5xl' />
                </a>
                <div className='w-2/3 flex flex-col'>
                    <h3 className='text-3xl font-semibold'>{video.name}</h3>
                    <p className='text-light-blue-200'>{video.type} ● {video.site} ● {video.published_at.slice(0,10)}</p>
                </div>
            </div>    
        ))}
        </div>
    </div>
    );
};

export default VideoSelectionComponent;
