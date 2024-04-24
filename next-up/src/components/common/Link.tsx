type LinkProps = {
  text: string
}

const Link = ({ text }: LinkProps) => {
  let lowerCaseHref = text.toLowerCase().replace(/ /g, '-')

  if (lowerCaseHref === 'home') {
    lowerCaseHref = '/'
  }

  return (
    <a
      href={lowerCaseHref}
      className="text-light-blue-300 transition-colors duration-300 ease-in-out hover:text-light-blue-600"
    >
      {text}
    </a>
  )
}

export default Link
