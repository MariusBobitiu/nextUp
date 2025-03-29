import { useCallback, useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const container = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (container.current) {
      setIsScrolled(container.current.scrollTop > 0);
    }
  }, []);

  useEffect(() => {
    const currentContainer = container.current;
    if (currentContainer) {
      currentContainer.addEventListener('scroll', handleScroll);
      return () => {
        currentContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll]);

  return (
    <>
      <Navbar isScrolled={isScrolled} />
      <main ref={container} className="h-full w-full overflow-auto p-4">{children}</main>
    </>
  )
}

export default Layout
