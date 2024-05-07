import { useParams } from 'react-router-dom'

const TvDetails = () => {
  const { slug } = useParams()
  const tvId = slug?.split('-').reverse().pop()
  console.log(tvId)

  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-center text-4xl font-bold">TV Details</h1>
      </div>
    </>
  )
}

export default TvDetails
