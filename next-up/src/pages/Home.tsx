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
import { useSelector } from 'react-redux'

const Home = () => {
  const navigate = useNavigate()

  const steps = [
    {
      icon: <SearchIcon className="text-4xl text-accent" />,
      title: 'Search',
      description:
        'Start by searching for any movie or TV show using our powerful search tool. Type in a title, actor, or genre and see instant results.',
      link: '/search',
    },
    {
      icon: <CompassIcon className="text-4xl text-accent" />,
      title: 'Browse by Categories',
      description:
        'Prefer to browse? Check out our categories—from Action to Comedy, and even TV Shows— to find a wide selection of titles organized for easy discovery.',
      link: '/categories',
    },
    {
      icon: <InfoIcon className="text-4xl text-accent" />,
      title: 'Discover Details',
      description:
        "Click on any title to view detailed information, including ratings, duration, release dates, and more. Get everything you need to decide what's worth watching.",
    },
    {
      icon: <PlayIcon className="text-4xl text-accent" />,
      title: 'Where to Watch?',
      description:
        'Find out where to watch your chosen movie or TV show. We provide links to streaming services so you can watch content right away or add it to your watchlist.',
    },
  ]

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useSelector((state: any) => state.user.user)
  const onGetStarted = () => {
    if (user) {
      navigate('/categories')
    } else {
      navigate('/sign-up')
    }
  };

  const scrollDown = () => {
    const element = document.getElementById('about')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="flex size-full flex-col gap-4 bg-gradient-to-b from-secondary-800 to-secondary-800 px-12">
      <Suspense fallback={<Loading />}>
        <section className="relative flex size-full">
          <div className="absolute inset-0 size-full bg-gradient-to-b from-secondary-800/50 to-secondary-800/40" />
          <div className="absolute inset-0 z-20 flex flex-col items-start justify-end gap-4 px-24 py-64">
            <div className="flex flex-col items-start justify-start gap-2 rounded-lg bg-secondary-500/15 px-12 py-8 backdrop-blur-lg">
              <h1 className="text-3xl font-bold text-primary-300">
                {' '}
                Discover your next favorite movie{' '}
              </h1>
              <h2 className="text-md -mt-2 font-semibold text-primary-500">
                {' '}
                Explore thousands of movies and TV shows, all in one place.{' '}
              </h2>
              <div className="flex items-center justify-start gap-4">
                <button
                  className="focus:ring-accent-teal-800 rounded-lg bg-gradient-to-b from-accent-300 to-accent-600 px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 ease-in-out hover:bg-accent-700 focus:outline-none focus:ring-4"
                  onClick={onGetStarted}
                >
                  Get Started
                </button>
                <button
                  className="focus:ring-none rounded-lg px-4 py-2 text-lg font-semibold text-accent transition-colors duration-300 ease-in-out hover:text-accent-700 focus:outline-none"
                  onClick={scrollDown}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
          <div className="flex size-full h-auto gap-4">
            <HeroSection />
          </div>
        </section>
        <section className="h-fit w-full" id="about">
          <div>
            <h1 className="mt-8 text-3xl font-semibold text-primary-300">
              {' '}
              Popular Movies this week{' '}
            </h1>
            <Carousel />
            <div className="flex flex-col gap-2 py-8">
              <h3 className="text-3xl font-semibold text-primary-300">
                Discover and Watch with Ease
              </h3>
              <p className="text-lg text-primary-500">
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
            <h4 className="text-2xl font-semibold text-primary-300">
              {' '}
              Subscribe to our newsletter for the latest movie releases, and
              updates!{' '}
            </h4>
            <div className="relative mx-auto w-2/3">
              <input
                type="email"
                name="emailField"
                className="focus:border-accent-teal-500 block w-full rounded-2xl border border-secondary-800 bg-secondary-700 p-4 pl-10 text-sm text-white placeholder-gray-400 outline-none"
                required
              />
              <button
                type="submit"
                className="focus:ring-accent-teal-800 absolute bottom-2.5 right-2.5 rounded-xl bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-700 focus:outline-none focus:ring-4"
                onClick={() => alert('Subscribed!')}
              >
                Sign me up!
              </button>
            </div>
            <p className="-mt-3 text-xs text-primary-500">
              Subscribing will let you know which movies are about to be
              released, and what features are we adding to the website, to
              enhance your experience.
            </p>
          </div>
          <div className="mt-4 h-0.5 w-full bg-secondary-200" />
          <Footer />
        </section>
      </Suspense>
    </div>
  )
}

export default Home
