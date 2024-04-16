import Image from 'next/image'
import Link from 'next/link'
import nextUpIcon from '~/public/nextUp - icon.svg'

const NextUp = () => {
  return (
    <Link
      href="/"
      className="inline-flex items-center justify-center h-10 gap-1 px-2 text-light-blue-50 bg-accent-teal-700 rounded-lg hover:scale-110 transition-transform"
    >
      <h1 className="sr-only">nextUp Movie Searching</h1>
      <Image src={nextUpIcon} alt="nextUp" className="w-6" />
      <span>nextUp</span>
    </Link>
  )
}

export default NextUp;