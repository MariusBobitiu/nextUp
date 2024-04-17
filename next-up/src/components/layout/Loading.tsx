import VerticalCarousel from '@/components/VerticalCarousel'

const Loading = () => {
  const paragraphs = [
    'Fetching records.',
    'Sorting records.',
    'Rendering records.',
    'Displaying records.',
  ]

  return (
    <>
      <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
        <div className="container mx-auto px-4">
          <VerticalCarousel paragraphs={paragraphs} interval={2000} />
        </div>
      </div>
    </>
  )
}

export default Loading
