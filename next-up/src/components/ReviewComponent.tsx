import DOMPurify from 'dompurify';
import { Review } from '@/types/MovieDetails'

const ReviewComponent: React.FC<{ review: Review }> = ({ review }) => {
    const createMarkup = (htmlString: string) => {
        return { __html: DOMPurify.sanitize(htmlString) };
    };

    return (
        <div className="flex flex-col gap-2 p-4 shadow-lg rounded-md bg-navy-600">
            <h3 className="text-2xl font-semibold">
            Review by {" "}
            <span className='text-light-blue-50 font-bold'>
                {review.author}
            </span>
            </h3>
            <div className="flex items-center gap-2 text-md text-light-blue-300">
                <p className="bg-accent-teal-700 py-1 px-2 rounded-md font-semibold text-light-blue-50">
                    ⭐ {review.author_details.rating ? review.author_details.rating + '0%' : 'No rating'}
                </p>
                <p>● Reviewed on {review.created_at.slice(0, 10)}</p>
            </div>
            <div className="clamp-7-lines" dangerouslySetInnerHTML={createMarkup(review.content)} />
            <a href={review.url} className="text-accent-teal hover:underline" target="_blank" rel="noopener noreferrer">
                Read full review
            </a>
        </div>
    );
};

export default ReviewComponent;