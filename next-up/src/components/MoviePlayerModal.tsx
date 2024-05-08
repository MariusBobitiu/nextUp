import { useState, useEffect } from 'react'
import { IoIosClose as CloseIcon } from 'react-icons/io'

type props = {
  videoTitle: string
  videoKey: string
  setVideoTitle: (title: string) => void
  setVideoKey: (key: string) => void
}

const MoviePlayerModal = ({
  videoTitle,
  videoKey,
  setVideoTitle,
  setVideoKey,
}: props) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash.startsWith('#player-')) {
        setIsOpen(true)
      } else {
        setIsOpen(false)
      }
    }
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange, false)

    // Check on initial load
    handleHashChange()

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('hashchange', handleHashChange, false)
    }
  }, [setVideoKey, videoKey, videoTitle])

  useEffect(() => {
    console.log(videoKey, videoTitle)
  }, [videoKey, videoTitle])

  return (
    <div>
      {isOpen && (
        <div className="fixed left-0 top-0 z-40 flex size-full h-full w-full items-center justify-center bg-gradient-to-br from-navy-800/40 via-navy-600/50 to-navy-900/40">
          <div className="relative flex h-4/5 w-4/5 flex-col items-start justify-center rounded-md bg-navy-600">
            <div className="flex w-full items-center justify-between p-4">
              <h2 className="text-xl font-semibold tracking-wide text-light-blue-200">
                {videoTitle}
              </h2>
              <button
                className="text-light-blue-200"
                onClick={() => {
                  setVideoTitle('')
                  setVideoKey('')
                  window.location.hash = ''
                  setIsOpen(false)
                }}
              >
                <CloseIcon className="text-3xl text-light-blue-600 hover:text-light-blue-200" />
              </button>
            </div>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoKey}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  )
}

export default MoviePlayerModal
