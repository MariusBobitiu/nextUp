import scene from '@/assets/Scene.png'
import { SignUpForm } from '@/components/Forms'
import Footer from '@/components/layout/Footer'

const SignUp = () => {
  return (
    <>
      <div className="h-full w-full rounded-xl px-20">
        <div className="flex h-full items-center justify-center pb-24">
          <div className="absolute left-0 top-0 z-30 h-full w-full rounded-xl bg-gradient-to-br from-navy-800/50 to-navy-600/5" />
          <div className="flex flex-1 items-center justify-center rounded-xl pb-16">
            <div className="absolute left-[27%] top-[50%] z-0 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy-400 blur-2xl " />
            <img
              src={scene}
              alt="Sign Up"
              className="z-20 w-4/5 bg-center object-cover"
            />
          </div>
          <div className="flex w-full flex-1 items-center justify-center">
            <SignUpForm />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <Footer />
        </div>
      </div>
    </>
  )
}

export default SignUp
