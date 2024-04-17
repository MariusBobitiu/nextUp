import React from 'react';

enum text {
    Home = '',
    Swiper = 'swiper',
    AISearchFeature = 'aisearchfeature'
}

type LinkProps = {
    text: string;
}

const Link = ({ text } : LinkProps ) => {
    let lowerCaseHref = text.toLowerCase().replace(/ /g, '');

    if (lowerCaseHref === 'home') {
        lowerCaseHref= '/';
    }
    
    return (
        <a
            href={lowerCaseHref}
            className="text-light-blue hover:text-light-blue-700 transition-colors duration-300 ease-in-out"
        >
            {text}
        </a>
    )
}

export default Link;