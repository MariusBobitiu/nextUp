import { useState, useEffect } from 'react';
import { IoIosClose as CloseIcon } from "react-icons/io";

type props = {
  videoTitle: string
  videoKey: string
  setVideoTitle: (title: string) => void
  setVideoKey: (key: string) => void
};

const MoviePlayerModal = ({videoTitle, videoKey, setVideoTitle, setVideoKey}: props) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#player-')) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange, false);

    // Check on initial load
    handleHashChange();

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('hashchange', handleHashChange, false);
    };
  }, []);

  return (
    <div>
      {isOpen && (
        <div className='size-full bg-gradient-to-br from-navy-800/40 to-navy-900/40 via-navy-600/50 fixed top-0 left-0 w-full h-full z-40 flex justify-center items-center'>
          <div className="relative w-4/5 h-4/5 bg-navy-600 rounded-md flex flex-col justify-center items-start">
            <div className='w-full flex justify-between items-center p-4'>
              <h2 className='text-xl text-light-blue-200 font-semibold tracking-wide'>{videoTitle}</h2>
              <button 
                className='text-light-blue-200'
                onClick={() => {
                  setVideoTitle('')
                  setVideoKey('')
                  window.location.hash = ''
                  setIsOpen(false)
                }}
              >
                <CloseIcon className='text-3xl text-light-blue-600 hover:text-light-blue-200' />
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
  );
};

export default MoviePlayerModal;
