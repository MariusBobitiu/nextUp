import { Suspense } from 'react'
import Loading from '@/components/layout/Loading'
import Carousel from '@/components/Carousel'
import { useNavigate } from 'react-router-dom'

import {
  RiSearch2Line as SearchIcon,
  RiCompass3Line as CompassIcon,
  RiInformation2Line as InfoIcon,
  RiPlayCircleLine as PlayIcon,
} from 'react-icons/ri'
import HeroSection from '@/components/HeroSection'
import Footer from '@/components/layout/Footer'
import Card from '@/components/Card'

const Home = () => {
  const navigate = useNavigate()

  const steps = [
    {
      icon: <SearchIcon className="text-4xl text-accent-teal" />,
      title: 'Search',
      description:
        'Start by searching for any movie or TV show using our powerful search tool. Type in a title, actor, or genre and see instant results.',
      link: '/search',
    },
    {
      icon: <CompassIcon className="text-4xl text-accent-teal" />,
      title: 'Browse by Categories',
      description:
        'Prefer to browse? Check out our categories—from Action to Comedy, and even TV Shows— to find a wide selection of titles organized for easy discovery.',
      link: '/categories',
    },
    {
      icon: <InfoIcon className="text-4xl text-accent-teal" />,
      title: 'Discover Details',
      description:
        "Click on any title to view detailed information, including ratings, duration, release dates, and more. Get everything you need to decide what's worth watching.",
    },
    {
      icon: <PlayIcon className="text-4xl text-accent-teal" />,
      title: 'Where to Watch?',
      description:
        'Find out where to watch your chosen movie or TV show. We provide links to streaming services so you can watch content right away or add it to your watchlist.',
    },
  ]

  const scrollDown = () => {
    const element = document.getElementById('about')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="flex h-fit w-full flex-col gap-4 overflow-y-auto bg-gradient-to-b from-navy-800 to-navy-700 px-12">
      <Suspense fallback={<Loading />}>
        <section className="relative h-dvh w-full">
          <div className="absolute left-0 top-0 h-[90%] w-full bg-gradient-to-b from-navy-800/50 to-navy-700/40" />
          <div className="absolute left-0 top-0 z-20 flex h-5/6 w-full flex-col items-start justify-end gap-4">
            <div className="z-40 mb-36 ml-24 flex flex-col items-start justify-start gap-2 rounded-lg bg-navy-500/15 px-12 py-8 backdrop-blur-lg">
              <h1 className="text-3xl font-bold text-light-blue-300">
                {' '}
                Discover your next favorite movie{' '}
              </h1>
              <h2 className="text-md -mt-2 font-semibold text-light-blue-500">
                {' '}
                Explore thousands of movies and TV shows, all in one place.{' '}
              </h2>
              <div className="flex items-center justify-start gap-4">
                <button
                  className="rounded-lg bg-accent-teal px-4 py-2 text-lg font-semibold text-white hover:bg-accent-teal-700 focus:outline-none focus:ring-4 focus:ring-accent-teal-800"
                  onClick={() => navigate('/sign-up')}
                >
                  Get Started
                </button>
                <button
                  className="focus:ring-none rounded-lg px-4 py-2 text-lg font-semibold text-accent-teal hover:text-accent-teal-700 focus:outline-none"
                  onClick={scrollDown}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
          <div className="flex h-full w-full items-center justify-center overflow-hidden">
            <div className="mt-[50%] grid w-full grid-cols-3">
              <HeroSection />
            </div>
          </div>
        </section>
        <section className="h-fit w-full" id="about">
          <div>
            <h1 className="mt-8 text-3xl font-semibold text-light-blue-300">
              {' '}
              Popular Movies this week{' '}
            </h1>
            <Carousel />
            <div className="flex flex-col gap-2 py-8">
              <h3 className="text-3xl font-semibold text-light-blue-300">
                Discover and Watch with Ease
              </h3>
              <p className="text-lg text-light-blue-500">
                {' '}
                Explore your next favorite movie or TV show in just a few steps.
                Our platform makes it easy to find, learn about, and watch
                content tailored to your preferences.
              </p>
            </div>
            <div className="flex w-full items-center justify-center">
              <div className="grid grid-cols-2 grid-rows-2 gap-4 px-4 pb-4">
                {steps.map((step, index) => (
                  <Card
                    key={index}
                    icon={step.icon}
                    title={step.title}
                    description={step.description}
                    link={step.link}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="mb-24 size-full">
          <div className="flex w-full flex-col items-center justify-center gap-4 p-8">
            <h4 className="text-2xl font-semibold text-light-blue-300">
              {' '}
              Subscribe to our newsletter for the latest movie releases, and
              updates!{' '}
            </h4>
            <div className="relative mx-auto w-2/3">
              <input
                type="email"
                name="emailField"
                className="block w-full rounded-2xl border border-navy-700 bg-navy-600 p-4 pl-10 text-sm text-white placeholder-gray-400 outline-none focus:border-accent-teal-500"
                required
              />
              <button
                type="submit"
                className="absolute bottom-2.5 right-2.5 rounded-xl bg-accent-teal px-4 py-2 text-sm font-medium text-white hover:bg-accent-teal-700 focus:outline-none focus:ring-4 focus:ring-accent-teal-800"
                onClick={() => alert('Subscribed!')}
              >
                Sign me up!
              </button>
            </div>
            <p className="-mt-3 text-xs text-light-blue-500">
              Subscribing will let you know which movies are about to be
              released, and what features are we adding to the website, to
              enhance your experience.
            </p>
          </div>
          <div className="mt-4 h-0.5 w-full bg-navy-200" />
          <Footer />
        </section>
      </Suspense>
    </div>
  )
}

export default Home
