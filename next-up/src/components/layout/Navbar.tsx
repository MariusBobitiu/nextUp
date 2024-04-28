import { SiGithub as Github, SiLinkedin as LinkedIn } from 'react-icons/si'
import Link from '@/components/common/Link'
import NextUp from '@/components/common/NextUp'
import { useEffect, useState } from 'react'

// type Props = {}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`container sticky top-0 z-40 mx-auto flex w-full items-center justify-between px-4 py-4 lg:px-12 ${isScrolled ? 'rounded-b-xl border border-navy-600 bg-navy-700' : 'border border-transparent'} transition-colors duration-500 ease-in-out`}
    >
      <NextUp />

      <ul className="flex items-center gap-8 text-lg font-medium text-white">
        <Link text="Home" />
        <Link text="Search" />
        <Link text="Categories" />
        {/* <Link text="Swiper" />
        <Link text="AI Powered Search" /> */}
      </ul>

      <ul className="flex items-center gap-4 text-sm font-medium text-white">
        <li className="hidden lg:block">
          <a href="/sign-in" className="hover:text-accent-teal">
            Sign in
          </a>
        </li>

        <li>
          <a
            href="https://github.com/MariusBobitiu/NextUp"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Github className="text-2xl transition-transform hover:scale-125 focus:scale-125" />
          </a>
        </li>

        <li>
          <a
            href="https://linkedin.com/in/marius-bobitiu"
            rel="noopener noreferrer"
            target="_blank"
          >
            <LinkedIn className="text-2xl transition-transform hover:scale-125 focus:scale-125" />
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
