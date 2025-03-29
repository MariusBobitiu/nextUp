type LinkProps = {
  text: string,
  active: boolean
}

const Link = ({ text, active }: LinkProps) => {
  let lowerCaseHref = text.toLowerCase().replace(/ /g, '-')

  if (lowerCaseHref === 'home') {
    lowerCaseHref = ''
  }

  return (
    <a
      href={`/${lowerCaseHref}`}
      className={`text-primary-300 transition-colors duration-300 ease-in-out hover:text-primary-600 ${active ? '!text-accent-400 hover:!text-accent-600' : ''}`}
    >
      {text}
    </a>
  )
}

export default Link
