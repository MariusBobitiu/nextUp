import Input from '@/components/common/Input'
import Scene from '@/assets/ForgotPassword-Laptop.svg'
import Logo from '@/assets/nextUp - icon.svg'
import { ChangeEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '@/components/layout/Loading'

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordReset, setPasswordReset] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isPageLoading, setIsPageLoading] = useState(true)

  const { token } = useParams()
  const [tokenValid, setTokenValid] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'newPassword') {
      setNewPassword(e.target.value)
    } else {
      setConfirmPassword(e.target.value)
    }
  }

  useEffect(() => {
    const verifyTokenValidity = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SV_API_BASE_URL}/users/verify-token`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          }
        )
        if (!response.ok) {
          throw new Error('Invalid token')
        }
        setTokenValid(true)
      } catch (error) {
        console.error(error)
      }
      setIsPageLoading(false)
    }

    verifyTokenValidity()
  }, [token])

  const resetPassword = async () => {
    console.log(newPassword, confirmPassword, token)
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SV_API_BASE_URL}/users/reset-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ newPassword, token }),
        }
      )
      if (response.ok) {
        setPasswordReset(true)
      } else {
        throw new Error('Failed to reset password')
      }
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  return (
    <>
      {isPageLoading && <Loading />}
      {tokenValid ? (
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
            ) : passwordReset ? (
              <div className="flex flex-col items-start justify-center gap-2">
                <h1 className="text-5xl font-bold text-primary-200">
                  Your password has been reset
                  <span className="text-accent">.</span>
                </h1>
                <p className="text-xl text-primary-400">
                  You can now sign in with your new password.
                </p>
                <a
                  href="/sign-in"
                  className="mt-4 self-center rounded-lg bg-accent px-8 py-3 text-xl font-bold text-white focus:outline-none"
                >
                  Sign In
                </a>
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
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  onChange={handleChange}
                  placeholder="New Password"
                  label="New Password"
                  className="w-full"
                />
                <Input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  label="Confirm Password"
                  className="w-full"
                />
                <button
                  className="mt-4 self-center rounded-lg bg-accent px-8 py-3 text-xl font-bold text-white focus:outline-none"
                  onClick={resetPassword}
                >
                  Reset Password
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center gap-16">
          <div className="flex flex-col items-center justify-center gap-4 p-16">
            <h1 className="text-4xl font-bold text-primary">
              Invalid token
            </h1>
            <p className="text-xl text-primary-400">
              The token you provided is invalid. Please try again.
            </p>
          </div>
        </div>
      )}
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
        Bear with us...
      </p>
    </div>
  )
}

export default ResetPassword
