import { useParams } from 'react-router-dom'

const TvDetails = () => {
  useParams()

  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-center text-4xl font-bold">TV Details</h1>
      </div>
    </>
  )
}

export default TvDetails
