import React from 'react';
import Image from 'next/image';
import nextUpIcon from '~/public/nextUp - icon.svg';

const Footer: React.FC = () => {
    return (
        <footer>
            <div className="container flex items-center justify-between w-full px-4 py-4 mx-auto lg:px-12">
                <span className="flex">© 2021{" "}
                    <Image src={nextUpIcon} alt="nextUp - icon" className="ml-2 w-6 transition-transform hover:scale-125 focus:scale-125" />{" "}
                nextUp</span>
                <span>
                    Made with 🤍 by{" "}
                    <a href="https://linkedin.com/in/marius-bobitiu" rel="noopener noreferrer" target="_blank">
                        Marius Bobitiu
                    </a>
                </span>
            </div>
        </footer>
    );
};

export default Footer;