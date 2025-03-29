import nextUpIcon from '@/assets/nextUp - icon.svg'

const Footer = () => {
  return (
    <footer>
      <div className="container mx-auto flex w-full items-center justify-between px-4 py-4 lg:px-12">
        <span className="flex">
          © {new Date().getFullYear()}{' '}
          <img
            src={nextUpIcon}
            alt="nextUp - icon"
            className="ml-2 w-6 transition-transform hover:scale-125 focus:scale-125"
          />{' '}
          nextUp
        </span>
        <span className='cursor-default'>
          Made with 🤍 by{' '}
          <a
            href="https://linkedin.com/in/marius-bobitiu"
            rel="noopener noreferrer"
            target="_blank"
            className='hover:text-accent focus:outline-none'
          >
            Marius Bobitiu
          </a>
        </span>
      </div>
    </footer>
  )
}

export default Footer
