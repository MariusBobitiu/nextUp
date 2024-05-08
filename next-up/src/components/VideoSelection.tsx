import categorizeVideosByType from '@/services/CategorizeVideosByType'
import React, { useState, useEffect } from 'react'
import { Video } from '@/types/MovieDetails'
import { FaPlay as PlayIcon } from 'react-icons/fa'
import MoviePlayerModal from './MoviePlayerModal'

const VideoSelectionComponent: React.FC<{ videos: Video[] }> = ({ videos }) => {
  const [selectedType, setSelectedType] = useState<string>('')
  const [videoMap, setVideoMap] = useState<Map<string, Video[]>>(new Map())
  const [videoTitle, setVideoTitle] = useState<string>('')
  const [videoKey, setVideoKey] = useState<string>('')

  useEffect(() => {
    const map = categorizeVideosByType(videos)
    setVideoMap(map)
    const firstType = Array.from(map.keys())[0]
    setSelectedType(firstType)
  }, [videos])

  return (
    <div className="mb-20 w-full px-12">
      <MoviePlayerModal
        videoTitle={videoTitle}
        videoKey={videoKey}
        setVideoTitle={setVideoTitle}
        setVideoKey={setVideoKey}
      />
      <div className="my-8 flex items-center justify-start gap-8 text-3xl">
        {Array.from(videoMap.keys()).map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`hover:text-light-blue-500 ${selectedType === type ? 'border-b border-accent-teal' : ''}`}
          >
            {type} ({videoMap.get(type)?.length})
          </button>
        ))}
      </div>
      <div className="flex flex-col items-start justify-start gap-4">
        {videoMap.get(selectedType)?.map((video) => (
          <div
            className={`relative my-4 flex h-80 w-full gap-8 rounded-lg bg-navy-600 p-4`}
            key={video.id}
          >
            <img
              className="h-full w-1/3 rounded-lg object-cover"
              src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
              alt={video.name}
            />
            <a
              href={`#player-${video.id}`}
              rel="noreferrer"
              className="absolute left-0 top-0 flex h-full w-1/3 items-center justify-center text-light-blue-200 hover:text-accent-teal"
              onClick={() => {
                setVideoTitle(video.name)
                setVideoKey(video.key)
              }}
            >
              <PlayIcon className="text-5xl" />
            </a>
            <div className="flex w-2/3 flex-col">
              <h3 className="text-3xl font-semibold">{video.name}</h3>
              <p className="text-light-blue-200">
                {video.type} ● {video.site} ● {video.published_at.slice(0, 10)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default VideoSelectionComponent
