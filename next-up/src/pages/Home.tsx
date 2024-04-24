import { Suspense } from 'react'
import Loading from '@/components/layout/Loading'
import Hero from '@/assets/Hero.png'

const Home = () => {
  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-hidden p-12">
      <Suspense fallback={<Loading />}>
        <div className="absolute left-0 top-0 z-10 h-full w-full">
          <img
            src={Hero}
            alt="Hero"
            className="h-full w-full object-cover -hue-rotate-30"
          />
          <div className="absolute left-0 top-0 h-full w-full"></div>
        </div>
        <div className="flex h-[75dvh] w-full flex-col gap-4">
          <div className="relative flex h-full w-full items-center justify-between gap-4">
            <div className="z-20 flex w-full flex-col gap-4 px-24 text-end">
              <h1 className="text-4xl font-bold text-white">
                Discover Your Next Favorite Movie
              </h1>
              <p className="text-lg text-white">
                {' '}
                Explore thousands of films from blockbusters to hidden gems
              </p>
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  )
}

export default Home
