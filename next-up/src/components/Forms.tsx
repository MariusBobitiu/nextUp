import Input from './common/Input'
import { ChangeEvent, useState } from 'react'

export const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState<'email' | 'username' | 'password' | null>(
    null
  )

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (error === e.target.name) {
      setError(null)
    }
  }

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      setError('password')
    }
    console.log(formData)
  }

  return (
    <>
      <form
        className="z-40 flex w-3/4 flex-col items-start justify-center rounded-xl p-12"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-start justify-center gap-2">
          <p className="text-xl tracking-[.20em] text-light-blue-300">
            START FOR FREE
          </p>
          <h1 className="mb-2 text-5xl font-bold text-light-blue-200">
            Create new account
            <span className="text-6xl text-accent-teal">.</span>
          </h1>
          <div className="mb-4 flex w-full items-center justify-between">
            <p className="text-xl text-light-blue-300">
              Already have an account?{' '}
              <a
                href="/sign-in"
                className="text-xl text-accent-teal hover:underline focus:outline-none"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
          <Input
            name="username"
            label="Username"
            type="text"
            placeholder="Enter your username"
            value={formData.username}
            autoComplete="username"
            onChange={handleChange}
            className={error === 'username' ? 'border-red-500' : ''}
          />
          <Input
            name="email"
            label="Email"
            type="email"
            autoComplete="current-email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className={error === 'email' ? 'border-red-500' : ''}
          />
          <Input
            name="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className={error === 'password' ? 'border-red-500' : ''}
          />
          <Input
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            autoComplete="new-password"
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={error === 'password' ? 'border-red-500' : ''}
          />
          <div className="my-2 flex w-full items-center justify-between">
            <p className="text-xs text-light-blue-300">
              By clicking Sign Up, you agree to our Terms of Service and Privacy
              Policy
            </p>
            <a
              href="#"
              className="text-xs text-accent-teal hover:underline focus:outline-none"
            >
              Learn more
            </a>
          </div>
          <button
            type="submit"
            className="mt-4 w-full rounded-xl bg-accent-teal p-4 text-xl font-semibold text-light-blue-200 transition-all duration-300 ease-in-out hover:bg-accent-teal-700 focus:outline-none active:bg-accent-teal-800"
          >
            Sign Up
          </button>
        </div>
      </form>
    </>
  )
}

export const SignInForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState<'email' | 'password' | null>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (error === e.target.name) {
      setError(null)
    }
  }

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <>
      <form
        className="z-40 flex w-3/4 flex-col items-start justify-center rounded-xl p-12"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-start justify-center gap-2">
          <p className="text-xl tracking-[.20em] text-light-blue-300">
            WELCOME BACK
          </p>
          <h1 className="mb-2 text-5xl font-bold text-light-blue-200">
            Sign in to your account
            <span className="text-6xl text-accent-teal">.</span>
          </h1>
          <div className="mb-4 flex w-full items-center justify-between">
            <p className="text-xl text-light-blue-300">
              Don't have an account?{' '}
              <a
                href="/sign-up"
                className="text-xl text-accent-teal hover:underline focus:outline-none"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
          <Input
            name="email"
            label="Email"
            type="email"
            autoComplete="current-email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className={error === 'email' ? 'border-red-500' : ''}
          />
          <Input
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className={error === 'password' ? 'border-red-500' : ''}
          />
          <div className="my-2 flex w-full items-center justify-between">
            <p className="text-xs text-light-blue-300">
              By clicking Sign In, you agree to our Terms of Service and Privacy
              Policy
            </p>
            <a
              href="#"
              className="text-xs text-accent-teal hover:underline focus:outline-none"
            >
              Learn more
            </a>
          </div>
          <button
            type="submit"
            className="mt-4 w-full rounded-xl bg-accent-teal p-4 text-xl font-semibold text-light-blue-200 transition-all duration-300 ease-in-out hover:bg-accent-teal-700 focus:outline-none active:bg-accent-teal-800"
          >
            Sign In
          </button>
        </div>
        <div className="mt-2 flex w-full items-center justify-end">
          <p className="text-xs text-light-blue-300">
            Forgot your password? No worries!{' '}
            <a
              href="/forgot-password"
              className="text-xs text-accent-teal hover:underline focus:outline-none"
            >
              Reset it now!
            </a>
          </p>
        </div>
      </form>
    </>
  )
}
