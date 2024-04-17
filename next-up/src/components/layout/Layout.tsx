import Navbar from './Navbar'
import Footer from './Footer'

type Props = {
    children: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <>
        <Navbar />

        <main className='p-4 w-full h-full'>
            {children}
        </main>

        <Footer/>
    </>
  )
}

export default Layout