import VerticalCarousel from "~/app/components/vertical-carousel"

const Loading = () => {
  const paragraphs = [
    "Fetching records.",
    "Sorting records.",
    "Rendering records.",
    "Displaying records.",
  ]

    return (
      <div className="container mx-auto px-4">
        <VerticalCarousel paragraphs={paragraphs} interval={4000} />
      </div>
    )
  }

  export default Loading;
  