import { SignInForm } from '@/components/Forms'
import Footer from '@/components/layout/Footer'
import scene from '@/assets/SignIn-Scene.svg'
import { useEffect } from 'react'

const SignIn = () => {

  useEffect(() => {
    document.title = 'Sign In | NextUp'
  }, []);

  return (
    <>
      <div className="h-full w-full rounded-xl px-20">
        <div className="flex h-full w-full items-center justify-center pb-24">
          <div className="absolute left-0 top-0 z-30 h-full w-full rounded-xl bg-gradient-to-br from-navy-800/90 to-navy-600/5 pointer-events-none" />
          <div className="flex flex-1 items-center justify-center rounded-xl pb-12">
            <div className="absolute left-[26.5%] top-[60%] z-0 h-1/3 w-1/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy-400 blur-2xl" />
            <img
              src={scene}
              alt="Sign Up"
              className="-mr-48 z-20 w-full bg-center object-cover -rotate-12"
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
