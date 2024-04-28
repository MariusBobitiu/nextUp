import Navbar from './Navbar'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />

      <main className="h-full w-full overflow-auto p-4">{children}</main>
    </>
  )
}

export default Layout
