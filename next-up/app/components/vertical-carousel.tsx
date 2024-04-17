'use client'

import React, { useEffect, useState } from 'react';
import { AiOutlineLoading as Spinner} from "react-icons/ai";

interface VerticalCarouselProps {
    paragraphs: string[];
    interval?: number;
}

const VerticalCarousel: React.FC<VerticalCarouselProps> = ({ paragraphs, interval = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % paragraphs.length);
        }, interval);

        return () => clearInterval(timer);
    }, [paragraphs.length, interval]);

    // Calculate the container height based on the number of paragraphs to prevent overlap
    const containerHeight = 100 * paragraphs.length; // 100% height for each paragraph

    return (
        <div className="w-80 h-1/6 flex gap-2 justify-center items-center bg-gradient-to-b from-navy-600 to-navy-500 border-2 border-navy-500 rounded-lg absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
            <div className="w-1/4 flex items-center justify-center">
                <Spinner className='animate-spin text-4xl'/>
            </div>
            <div className="w-3/4 overflow-hidden relative h-24">
                <div className="transition-transform duration-700 ease-out"
                    style={{ transform: `translateY(-${currentIndex * 100 / paragraphs.length}%)`, height: `${containerHeight}%` }}>
                    {paragraphs.map((paragraph, index) => (
                        <div key={index}
                            className="w-full flex items-center justify-center h-24 text-xl"> 
                            {paragraph}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VerticalCarousel;
