import { SignInForm } from '@/components/Forms'
import Footer from '@/components/layout/Footer'
import scene from '@/assets/SignIn-Scene.svg'
import { useEffect } from 'react'

const SignIn = () => {
  useEffect(() => {
    document.title = 'Sign In | NextUp'
  }, [])

  return (
    <>
      <div className="h-full w-full rounded-xl px-20">
        <div className="flex h-full w-full items-center justify-center pb-24">
          <div className="pointer-events-none absolute left-0 top-0 z-30 h-full w-full rounded-xl bg-gradient-to-br from-secondary-800/90 to-secondary-700/5" />
          <div className="flex flex-1 items-center justify-center rounded-xl pb-12">
            <div className="absolute left-[26.5%] top-[60%] z-0 h-1/3 w-1/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary-700 blur-2xl" />
            <img
              src={scene}
              alt="Sign Up"
              className="z-20 -mr-48 w-full -rotate-12 bg-center object-cover"
            />
          </div>
          <div className="flex w-full flex-1 items-center justify-center">
            <SignInForm />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <Footer />
        </div>
      </div>
    </>
  )
}

export default SignIn
