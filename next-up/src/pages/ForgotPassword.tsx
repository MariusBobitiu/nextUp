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
    const sendResetLink = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SV_API_BASE_URL}/users/forgot-password`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          }
        )
        if (response.ok) {
          setResetLinkSent(true)
        } else {
          throw new Error('Failed to send reset link')
        }
      } catch (error) {
        console.error(error)
      }
      setIsLoading(false)
    }
    sendResetLink()
  }

  return (
    <>
      <div className="flex h-full w-full items-center justify-center gap-16">
        <div className="relative flex h-full w-2/5 items-center justify-center">
          <div className="absolute z-0 h-2/5 w-3/5 rounded-full bg-secondary-700 blur-2xl" />
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
              <h1 className="text-5xl font-bold text-primary-200">
                Reset link sent
                <span className="text-accent">.</span>
              </h1>
              <p className="text-xl text-primary-400">
                Please check your email to reset your password.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-start justify-center gap-2">
              <h1 className="text-5xl font-bold text-primary-200">
                Forgot your password?
                <span className="text-accent">.</span>
              </h1>
              <p className="text-xl text-primary-400">
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
                className="mt-4 self-center rounded-lg bg-accent px-8 py-3 text-xl font-bold text-white focus:outline-none"
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
      <p className="animate-pulse text-2xl font-bold text-primary">
        Sending...
      </p>
    </div>
  )
}

export default ForgotPassword
