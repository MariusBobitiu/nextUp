import DOMPurify from 'dompurify'
import { Review } from '@/types/MovieDetails'

const ReviewComponent: React.FC<{ review: Review }> = ({ review }) => {
  const createMarkup = (htmlString: string) => {
    return { __html: DOMPurify.sanitize(htmlString) }
  }

  return (
    <div className="flex flex-col gap-2 rounded-md bg-secondary-700 p-4 shadow-lg">
      <div className="flex w-full items-center justify-between">
        <h3 className="text-2xl font-semibold">
          Review by{' '}
          <span className="font-bold text-primary-50">{review.author}</span>
        </h3>
				<div className="text-md flex items-center gap-2 text-primary-300">
					<p className="rounded-md bg-secondary-600 px-2 py-1 font-semibold text-primary-50">
						⭐{' '}
						{review.author_details.rating
							? review.author_details.rating + '0%'
							: 'No rating'}
					</p>
					<p>Reviewed on {review.created_at.slice(0, 10)}</p>
				</div>
      </div>
      <div
        className="line-clamp-4 mt-4 text-primary-500"
        dangerouslySetInnerHTML={createMarkup(review.content)}
      />
      <a
        href={review.url}
        className={`text-primary-300 hover:underline ${review.content.length > 200 ? '' : 'hidden'}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Read full review
      </a>
    </div>
  )
}

export default ReviewComponent
