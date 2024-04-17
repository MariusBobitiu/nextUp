import nextUpIcon from '@/assets/nextUp - icon.svg';

const NextUp = () => {
    return (
        <a
            href="/"
            className="inline-flex items-center justify-center h-10 gap-1 px-2 text-light-blue-50 bg-accent-teal-700 rounded-lg hover:scale-110 transition-transform"
        >
            <h1 className="sr-only">nextUp Movie Searching</h1>
            <img src={nextUpIcon} alt="nextUp" className="w-6" />
            <span>nextUp</span>
        </a>
    )
}

export default NextUp;