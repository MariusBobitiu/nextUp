import { signIn, signUp } from '@/services/Auth'
import Input from './common/Input'
import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '@/features/user/userSlice'
import { useNavigate } from 'react-router-dom'

export const SignUpForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState<{
    username: {
      invalid: boolean
      message: string
    }
    email: {
      invalid: boolean
      message: string
    }
    password: {
      invalid: boolean
      message: string
    }
    confirmPassword: {
      invalid: boolean
      message: string
    }
  }>({
    email: {
      invalid: false,
      message: '',
    },
    password: {
      invalid: false,
      message: '',
    },
    username: {
      invalid: false,
      message: '',
    },
    confirmPassword: {
      invalid: false,
      message: '',
    },
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    // Reset error state when form data changes
    setError({
      username: {
        invalid: false,
        message: '',
      },
      email: {
        invalid: false,
        message: '',
      },
      password: {
        invalid: false,
        message: '',
      },
      confirmPassword: {
        invalid: false,
        message: '',
      },
    })
  }, [formData])

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formData.username === '' || formData.username.length < 3) {
      setError({
        ...error,
        username: { invalid: true, message: 'Username too short.' },
      })
      return
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    if (formData.email === '' || !emailRegex.test(formData.email)) {
      setError({
        ...error,
        email: { invalid: true, message: 'Invalid email address.' },
      })
      return
    }
    if (formData.password.length < 8) {
      setError({
        ...error,
        password: { invalid: true, message: 'Password too short.' },
      })
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError({
        ...error,
        password: { invalid: true, message: 'Passwords do not match.' },
      })
      setError({
        ...error,
        confirmPassword: { invalid: true, message: 'Passwords do not match.' },
      })
      return
    }
    if (formData.confirmPassword === '') {
      setError({
        ...error,
        confirmPassword: {
          invalid: true,
          message: 'Please confirm your password.',
        },
      })
      return
    }

    console.log(formData)
    const response = await signUp(formData)
    if (!response.success) {
      console.error(response)
      return
    }

    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    })

    dispatch(setUser(response.user))
    navigate('/')
  }

  return (
    <>
      <form
        className="z-40 flex w-3/4 flex-col items-start justify-center rounded-xl p-12"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-start justify-center gap-2">
          <p className="text-xl tracking-[.20em] text-primary-300">
            START FOR FREE
          </p>
          <h1 className="mb-2 text-5xl font-bold text-primary-200">
            Create new account
            <span className="text-6xl text-accent">.</span>
          </h1>
          <div className="mb-4 flex w-full items-center justify-between">
            <p className="text-xl text-primary-300">
              Already have an account?{' '}
              <a
                href="/sign-in"
                className="text-xl text-accent hover:underline focus:outline-none"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
        <div className="flex h-full w-full flex-col items-center justify-center gap-2">
          <Input
            name="username"
            label="Username"
            type="text"
            placeholder="Enter your username"
            value={formData.username}
            autoComplete="username"
            onChange={handleChange}
            invalid={error.username.invalid}
            error={error.username.message}
          />
          <Input
            name="email"
            label="Email"
            type="email"
            autoComplete="current-email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            invalid={error.email.invalid}
            error={error.email.message}
          />
          <Input
            name="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            invalid={error.password.invalid}
            error={error.password.message}
          />
          <Input
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            autoComplete="new-password"
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            invalid={error.confirmPassword.invalid}
            error={error.confirmPassword.message}
          />
          <button
            type="submit"
            className="mt-4 w-full rounded-xl bg-gradient-to-b from-accent-400 to-accent-700 px-4 py-2 text-xl font-semibold text-primary-200 transition-all duration-300 ease-in-out hover:bg-accent-700 hover:brightness-90 focus:outline-none active:bg-accent-800 active:brightness-75"
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
    username: '',
    password: '',
  })
  const [error, setError] = useState<{
    email: {
      invalid: boolean
      message: string
    }
    username: {
      invalid: boolean
      message: string
    }
    password: {
      invalid: boolean
      message: string
    }
  }>({
    email: {
      invalid: false,
      message: '',
    },
    username: {
      invalid: false,
      message: '',
    },
    password: {
      invalid: false,
      message: '',
    },
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Check if the user tried to enter a username or email
    if (e.target.name === 'emailOrUsername') {
      if (e.target.value.includes('@')) {
        setFormData({ ...formData, email: e.target.value, username: '' })
      } else {
        setFormData({ ...formData, username: e.target.value, email: '' })
      }

      return
    }
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formData)

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    if (formData.email === '' && formData.username === '') {
      setError({
        ...error,
        email: {
          invalid: true,
          message: 'Please enter your email or username.',
        },
      })
      return
    }
    if (formData.email !== '' && !emailRegex.test(formData.email)) {
      setError({
        ...error,
        email: { invalid: true, message: 'Invalid email address.' },
      })
      return
    }
    if (formData.username !== '' && formData.username.length < 3) {
      setError({
        ...error,
        username: { invalid: true, message: 'Username too short.' },
      })
      return
    }

    if (formData.password === '' || formData.password.length < 8) {
      setError({
        ...error,
        password: { invalid: true, message: 'Password too short.' },
      })
      return
    }
    if (formData.password === '') {
      setError({
        ...error,
        password: { invalid: true, message: 'Please enter your password.' },
      })
      return
    }
    console.log(formData)
    const response = await signIn(formData)
    if (!response.success) {
      console.error('Sign in failed', response)
      if (response.error) {
        if (response.error === 'User not found') {
          if (formData.email !== '') {
            setError({
              ...error,
              email: { invalid: true, message: 'Email not found.' },
            })
          }
          if (formData.username !== '') {
            setError({
              ...error,
              username: { invalid: true, message: 'Username not found.' },
            })
          }
        } else if (response.error === 'Invalid credentials') {
          setError({
            ...error,
            password: { invalid: true, message: 'Invalid password.' },
          })
        }
      }
      return
    }
    setFormData({
      email: '',
      username: '',
      password: '',
    })
    console.log(response)
    dispatch(setUser(response.user))
    navigate('/')
  }

  useEffect(() => {
    // Reset error state when form data changes
    setError({
      email: {
        invalid: false,
        message: '',
      },
      username: {
        invalid: false,
        message: '',
      },
      password: {
        invalid: false,
        message: '',
      },
    })
  }, [formData])

  return (
    <>
      <form
        className="z-40 flex w-3/4 flex-col items-start justify-center rounded-xl p-12"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-start justify-center gap-2">
          <p className="text-xl tracking-[.20em] text-primary-300">
            WELCOME BACK
          </p>
          <h1 className="mb-2 text-5xl font-bold text-primary-200">
            Sign in to your account
            <span className="text-6xl text-accent">.</span>
          </h1>
          <div className="mb-4 flex w-full items-center justify-between">
            <p className="text-xl text-primary-300">
              Don't have an account?{' '}
              <a
                href="/sign-up"
                className="text-xl text-accent hover:underline focus:outline-none"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
        <div className="flex h-full w-full flex-col items-center justify-center gap-2">
          <Input
            name="emailOrUsername"
            label="Email or Username"
            type="text"
            placeholder="Enter your email or username"
            autoComplete="username"
            value={formData.email || formData.username}
            onChange={handleChange}
            invalid={error.email.invalid || error.username.invalid}
            error={error.email.message || error.username.message}
          />
          <Input
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            invalid={error.password.invalid}
            error={error.password.message}
          />
          <div className="my-2 mt-4 flex w-full items-center justify-between">
            <label htmlFor="remember-me" className="text-sm text-primary-300">
              <input
                type="checkbox"
                id="remember-me"
                className="mr-2 h-4 w-4 rounded border-2 border-secondary-700 bg-secondary-800 text-accent focus:ring-accent"
              />
              Remember me
            </label>
            <p className="text-sm text-primary-300">
              Forgot your password?{' '}
              <a
                href="/forgot-password"
                className="text-sm text-accent hover:underline focus:outline-none"
              >
                Reset it now!
              </a>
            </p>
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-b from-accent-400 to-accent-700 px-4 py-2 text-xl font-semibold text-primary-200 transition-all duration-300 ease-in-out hover:bg-accent-700 hover:brightness-90 focus:outline-none active:bg-accent-800 active:brightness-75"
          >
            Sign In
          </button>
        </div>
        <div className="mt-2 flex w-full items-center justify-end"></div>
      </form>
    </>
  )
}
