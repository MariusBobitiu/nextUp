import Input from '@/components/common/Input'
import { ChangeEvent, useState } from 'react'
import Scene from '@/assets/ForgotPassword-Laptop.svg'
import Logo from '@/assets/nextUp - icon.svg'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [resetLinkSent, setResetLinkSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const sendResetLink = () => {
    setIsLoading(true)
    setResetLinkSent(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  return (
    <>
      <div className="flex h-full w-full items-center justify-center gap-16">
        <div className="relative flex h-full w-2/5 items-center justify-center shadow-xl">
          <div className="absolute z-0 h-3/5 w-4/5 rounded-full bg-navy-500 blur-lg" />
          <img
            src={Scene}
            alt="Forgot Password"
            className="z-10 w-3/4 rounded-xl"
          />
        </div>
        <div className="flex h-full w-2/5 items-center justify-center">
          {isLoading ? (
            <Loader />
          ) : resetLinkSent ? (
            <div className="flex flex-col items-start justify-center gap-2">
              <h1 className="text-5xl font-bold text-light-blue-200">
                Reset link sent
                <span className="text-accent-teal">.</span>
              </h1>
              <p className="text-xl text-light-blue-400">
                Please check your email to reset your password.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-start justify-center gap-2">
              <h1 className="text-5xl font-bold text-light-blue-200">
                Forgot your password?
                <span className="text-accent-teal">.</span>
              </h1>
              <p className="text-xl text-light-blue-400">
                Enter your email below to reset your password.
              </p>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Email"
                label="Email"
                className="w-full"
              />
              <button
                className="mt-4 self-center rounded-lg bg-accent-teal px-8 py-3 text-xl font-bold text-white focus:outline-none"
                onClick={sendResetLink}
              >
                Send Reset Link
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

const Loader = () => {
  return (
    <div className="flex h-full w-full items-center justify-center gap-4">
      <div className="h-16 w-16 animate-pulse">
        <img src={Logo} alt="Logo" className="h-full w-full" />
      </div>
      <p className="animate-pulse text-2xl font-bold text-light-blue">
        Sending...
      </p>
    </div>
  )
}

export default ForgotPassword
