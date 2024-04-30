import { SiGithub as Github, SiLinkedin as LinkedIn } from 'react-icons/si'
import Link from '@/components/common/Link'
import NextUp from '@/components/common/NextUp'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { userState } from '@/types/Auth'
import { IoMdArrowDropdown as DropdownIcon } from "react-icons/io";
import { FaRegUser as ProfileIcon } from "react-icons/fa";
import { BiLogOut as LogoutIcon } from "react-icons/bi"; 
 import { IoIosSettings as SettingsIcon } from "react-icons/io";

// type Props = {}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const user = useSelector((state: userState) => state.user.user)
  console.log(user)

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }

  const toggleDropdown = () => {
    const dropdown = document.getElementById('dropdown')
    dropdown?.classList.toggle('hidden')
  }
  
  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    }
  }, [user])
  
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
        {isAuthenticated ? (
          <li className='relative'>
            <button data-dropdown-toggle="dropdown" className="hover:text-accent-teal" onClick={toggleDropdown}>
              Hi, {user.username}
              <DropdownIcon className="inline-block text-xl" />

              <div id="dropdown" className={`absolute z-10 hidden bg-navy-700 divide-y divide-navy-600 rounded-lg shadow w-44 right-0`}>
                <ul className="py-2 text-sm text-white" aria-labelledby="dropdownDefaultButton">
                  <li>
                    <a href="/profile" className="block px-4 py-2 hover:bg-navy-600">
                      <ProfileIcon className="inline-block mr-2" />
                      Profile</a>
                  </li>
                  <li>
                    <a href="/settings" className="block px-4 py-2 hover:bg-navy-600">
                      <SettingsIcon className="inline-block mr-2" />
                      Settings</a>
                  </li>
                  <li>
                    <a href="/sign-out" className="block px-4 py-2 hover:bg-navy-600">
                      <LogoutIcon className="inline-block mr-2" />
                      Sign out</a>
                  </li>
                </ul>
              </div>
            </button>
          </li>
        ): (
          <li className="hidden lg:block">
            <a href="/sign-in" className="hover:text-accent-teal">
              Sign in
            </a>
          </li>
        )}

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
