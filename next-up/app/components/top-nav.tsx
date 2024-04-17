import Image from 'next/image'
import nextUpIcon from '~/public/nextUp - icon.svg';
import { SiGithub as Github, SiLinkedin as LinkedIn} from 'react-icons/si';
import Link from './link';
import NextUp from './next-up';

const TopNav = () => (
    <nav className="container flex items-center justify-between w-full px-4 py-4 mx-auto lg:px-12">
      <NextUp />

      <ul className="flex items-center gap-8 text-lg font-medium text-white">
        <Link text="Home" />
        <Link text="Categories" />
        <Link text="Swiper" />
        <Link text='AI Search Feature' />
      </ul>

      <ul className="flex items-center gap-4 text-sm font-medium text-white">
        <li className="hidden lg:block">
          <a href="https://nextup.mariusbobitiu.dev" rel="noopener noreferrer" target='_blank'>
            <Image
              src={nextUpIcon}
              alt="Xata logo"
              className="w-6 transition-transform hover:scale-125 focus:scale-125"
            />
          </a>
        </li>
  
        <li>
          <a href="https://github.com/MariusBobitiu/NextUp" rel="noopener noreferrer" target='_blank'>
            <Github className="text-2xl transition-transform focus:scale-125 hover:scale-125" />
          </a>
        </li>
  
        <li>
          <a href="https://linkedin.com/in/marius-bobitiu" rel="noopener noreferrer" target="_blank">
            <LinkedIn className="text-2xl transition-transform focus:scale-125 hover:scale-125" />
          </a>
        </li>
  
      </ul>
    </nav>
  )

  export default TopNav;