"use client"

import TopNav from '~/app/components/top-nav';
import shatteredGlass from '~/public/shattered_glass.webp';
import Image from 'next/image';
import React from 'react';

const ErrorPage: React.FC = () => {
    return (
        <div className='w-full h-full'>
            <div className='absolute top-0 left-0 w-full h-screen z-30'>
                <Image src={shatteredGlass} rel='noopener noreferrer' alt='Shattered glass' layout='fill' objectFit='cover' className='opacity-50'/>
            </div>
            <div className='w-full p-4 mx-auto bg-navy-500'>
            </div>
            <div className='-rotate-[35deg] w-full h-full mt-80'>
                <TopNav />
            </div>
            <div className='text-4xl font-bold text-light-blue-400 h-full w-full flex flex-col justify-end items-end'>
                <p className='text-end'>Congrats! You broke it.</p>
                <button className='bg-light-blue-400 text-navy-500 px-6 py-2 rounded-lg z-40'>Go back</button>
            </div>
        </div>
    );
};

export default ErrorPage;