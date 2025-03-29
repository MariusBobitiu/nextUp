// import { SiGithub as Github, SiLinkedin as LinkedIn } from 'react-icons/si'
import Link from '@/components/common/Link'
import NextUp from '@/components/common/NextUp'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { userState } from '@/types/Auth'
import { IoMdArrowDropdown as DropdownIcon } from 'react-icons/io'
import { FaRegUser as ProfileIcon } from 'react-icons/fa'
import { BiLogOut as LogoutIcon } from 'react-icons/bi'
import { IoIosSettings as SettingsIcon } from 'react-icons/io'

const Navbar: React.FC<{
  isScrolled: boolean
}> = ({ isScrolled }) => {
  const pathname = window?.location.pathname
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const user = useSelector((state: userState) => state.user.user)
  // console.log(user)/

  const [dropdownVisible, setDropdownVisible] = useState(false)
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible)
  }

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true)
    }
  }, [user])

  return (
    <nav
      className={`sticky top-0 z-9999 w-full ${isScrolled ? 'bg-secondary-900 shadow-xl' : 'bg-secondary-800'} transition-colors duration-500 ease-in-out`}
    >
      <div
        className={`container mx-auto flex items-center justify-between py-4`}
      >
        <NextUp />

        <ul className="flex items-center gap-8 text-lg font-medium text-white">
          <Link
            text="Home"
            active={pathname === '/' || pathname.startsWith('/home')}
          />
          <Link text="Search" active={pathname.startsWith('/search')} />
          <Link text="Categories" active={pathname.startsWith('/categories')} />
          {/* <Link text="Swiper" />
          <Link text="AI Powered Search" /> */}
        </ul>

        <ul className="flex items-center gap-4 text-sm font-medium text-white">
          {isAuthenticated ? (
            <li className="relative">
              <button
                data-dropdown-toggle="dropdown"
                className="hover:text-accent"
                onClick={toggleDropdown}
              >
                Hi, {user.username}
                <DropdownIcon className="inline-block text-xl" />
                <div
                  id="dropdown"
                  className={`absolute z-10 ${dropdownVisible ? '' : 'hidden'} right-0 overflow-hidden rounded-lg bg-secondary-700`}
                >
                  <ul
                    className="text-sm text-white"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li>
                      <a
                        href="/profile"
                        className="flex justify-normal items-center px-4 pr-16 py-3 hover:bg-secondary-600"
                      >
                        <ProfileIcon className="mr-2 inline-block" />
                        Profile
                      </a>
                    </li>
                    <hr className="border-t border-secondary-600" />
                    <li>
                      <a
                        href="/settings"
                        className="flex justify-normal items-center px-4 pr-16 py-3 hover:bg-secondary-600"
                      >
                        <SettingsIcon className="mr-2 inline-block" />
                        Settings
                      </a>
                    </li>
                    <hr className="border-t border-secondary-600" />
                    <li>
                      <a
                        href="/sign-out"
                        className="flex justify-normal items-center px-4 pr-16 py-3 hover:bg-secondary-600"
                      >
                        <LogoutIcon className="mr-2 inline-block" />
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </button>
            </li>
          ) : (
            <li className="hidden lg:block">
              <a href="/sign-in" className="hover:text-accent text-lg">
                Sign in
              </a>
            </li>
          )}

          {/* <li>
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
          </li> */}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
