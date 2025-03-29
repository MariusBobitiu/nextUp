import nextUpIcon from '@/assets/nextUp - icon.svg';

const NextUp = () => {
    return (
        <a
            href="/"
            className="inline-flex items-center justify-center h-10 gap-1 px-2 text-primary-50 bg-gradient-to-b from-accent-400 to-accent-800 rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-accent-800"
        >
            <h1 className="sr-only">nextUp Movie Searching</h1>
            <img src={nextUpIcon} alt="nextUp" className="w-6" />
            <span>nextUp</span>
        </a>
    )
}

export default NextUp;