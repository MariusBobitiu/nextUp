import { userState } from '@/types/Auth'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaBookmark as FilledBookmark } from 'react-icons/fa'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { fetchUserWatchlist } from '@/lib/fetchData'
import Loading from '@/components/layout/Loading'
import Input from '@/components/common/Input'
import { setUser } from '@/features/user/userSlice'
import ChangePasswordModal from '@/components/ChangePasswordModal'
import { useNavigate } from 'react-router-dom'

const Settings = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const user = useSelector((state: userState) => state.user.user)
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<{
    username: string
    email: string
  }>({
    username: user?.username,
    email: user?.email,
  })
  const [error, setError] = useState<{
    username: {
      invalid: boolean
      message: string
    },
    email: {
      invalid: boolean
      message: string
    }
  }>({
    username: {
      invalid: false,
      message: '',
    },
    email: {
      invalid: false,
      message: '',
    },
  })

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
    })
  }, [formData])

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true)
    }
  }, [user])

  const {
    data: watchList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['watchList', user?.username],
    queryFn: async () => fetchUserWatchlist(user?.username),
    enabled: !!user?.username,
  })

  const updateUserMutation = useMutation({
    mutationKey: ['updateUser'],
    mutationFn: async (userData: { username: string; email: string }) => {
      const res = await fetch(`${import.meta.env.VITE_SV_API_BASE_URL}/users/${user.username}/update-user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message)
      }

      return data
    },
    onSuccess: (data) => {
      setFormData({
        username: data.user.username,
        email: data.user.email,
      })
      setError({
        username: {
          invalid: false,
          message: '',
        },
        email: {
          invalid: false,
          message: '',
        },
      })
      // Update user state in Redux store
      dispatch(setUser(data.user));
    },
    onError: (error) => {
      setError((prev) => ({
        ...prev,
        username: {
          invalid: true,
          message: (error as Error).message,
        },
      }))
    }
  })

  const clearWatchlistMutation = useMutation({
    mutationKey: ['clearWatchlist'],
    mutationFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_SV_API_BASE_URL}/movies/${user.username}/watchlist/clear`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message)
      }
      return data
    },
    onSuccess: () => {
      // Clear watchlist in Redux store
      dispatch(setUser({ ...user, watchList: [] }))
      queryClient.invalidateQueries(['watchList', user.username])
    },
    onError: (error) => {
      setError((prev) => ({
        ...prev,
        watchList: {
          invalid: true,
          message: (error as Error).message,
        },
      }))
    }
  });

  const deleteAccountMutation = useMutation({
    mutationKey: ['deleteAccount'],
    mutationFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_SV_API_BASE_URL}/users/${user.username}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message)
      }
      return data
    },
    onSuccess: () => {
      // Clear user state in Redux store
      navigate('/sign-out')
      setIsAuthenticated(false)
    },
    onError: (error) => {
      setError((prev) => ({
        ...prev,
        account: {
          invalid: true,
          message: (error as Error).message,
        },
      }))
    }
  });

  const onCancel = () => {
    setFormData({
      username: user.username,
      email: user.email,
    })
    setError({
      username: {
        invalid: false,
        message: '',
      },
      email: {
        invalid: false,
        message: '',
      },
    })
  }

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Validate form data
    let isValid = true
    if (formData.username.trim() === '') {
      setError((prev) => ({
        ...prev,
        username: {
          invalid: true,
          message: 'Username is required',
        },
      }))
      isValid = false
    }
    if (formData.email.trim() === '') {
      setError((prev) => ({
        ...prev,
        email: {
          invalid: true,
          message: 'Email is required',
        },
      }))
      isValid = false
    }
    // email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError((prev) => ({
        ...prev,
        email: {
          invalid: true,
          message: 'Email is invalid',
        },
      }))
      isValid = false
    }
    if (isValid) {
      // Submit form data
      updateUserMutation.mutate({
        username: formData.username,
        email: formData.email,
      });
    }
  }
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const onClearWatchList = () => {
    if (window.confirm('Are you sure you want to clear your watchlist?')) {
      clearWatchlistMutation.mutate()
    }
  }
  const onDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action is irreversible.')) {
      deleteAccountMutation.mutate()
    }
  };

  if (isLoading) return <Loading />

  if (isError) return <h1>Error</h1>

  return (
    <>
      <ChangePasswordModal 
        isOpen={changePasswordModalOpen}
        onClose={() => setChangePasswordModalOpen(false)}
      />
      {isAuthenticated ? (
        <div className="flex size-full">
          <div className="container mx-auto flex h-full flex-col items-start justify-normal gap-8">
            <div className="flex w-full items-center justify-between gap-12 rounded-lg bg-gradient-to-b from-secondary-500 to-secondary-700 px-12 py-8">
              <div className="flex items-center justify-center">
                <img
                  src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
                  alt="profile"
                  className="h-32 w-32 rounded-full"
                />
                <div className="ml-4">
                  <h1 className="text-2xl text-primary-200">{user.username}</h1>
                  <small className="text-sm">{user.email}</small>
                  <p className="text-lg">
                    Member since{' '}
                    {new Date(user.createdAt).toLocaleDateString('en-GB')}
                  </p>
                </div>
              </div>
              <div className="mr-4">
                <h3 className="flex items-center gap-2 text-2xl text-primary-200">
                  <FilledBookmark className="inline-block size-6 text-accent" />
                  WatchList
                </h3>
                <p className="text-lg">
                  You have <b>{watchList.length}</b> movies in your watchlist
                </p>
              </div>
            </div>
            <hr className="w-full border-t-2 border-secondary-700" />
            <form
              className="flex w-full flex-col items-start justify-normal"
              onSubmit={onSubmitForm}
            >
              <div className='flex w-full items-center justify-between gap-4'>
                <h1 className="text-2xl text-primary-200">Edit your account</h1>
                <button
                  type="button"
                  className="rounded-xl bg-gradient-to-b from-secondary-400 to-secondary-700 px-4 py-2 text-xl font-semibold text-primary-200 transition-all duration-300 ease-in-out hover:brightness-90 focus:outline-none active:brightness-75"
                  onClick={() => setChangePasswordModalOpen(true)}
                >
                  Change Password
                </button>
              </div>
              <Input
                type="text"
                name="username"
                label="Username"
                placeholder="Username"
                value={formData.username}
                onChange={onChangeInput}
                className="w-full"
                invalid={error.username.invalid}
                error={error.username.message}
              />
              <Input
                type="email"
                name="email"
                label="Email"
                placeholder="Email"
                value={formData.email}
                onChange={onChangeInput}
                className="w-full"
                invalid={error.email.invalid}
                error={error.email.message}
              />
              <div className="flex w-full items-center justify-between gap-4 mt-4">
                <button type="button" className="w-full rounded-xl bg-gradient-to-b from-error-400 to-error-700 px-4 py-2 text-xl font-semibold text-primary-200 transition-all duration-300 ease-in-out hover:brightness-90 focus:outline-none active:brightness-75"
                  onClick={onCancel}
                  disabled={updateUserMutation.isLoading}
                >
                  Cancel
                </button>
                <button type="submit" className="w-full rounded-xl bg-gradient-to-b from-accent-400 to-accent-700 px-4 py-2 text-xl font-semibold text-primary-200 transition-all duration-300 ease-in-out hover:bg-accent-700 hover:brightness-90 focus:outline-none active:bg-accent-800 active:brightness-75">
                  Save Changes
                </button>
              </div>
            </form>
            <hr className="w-full border-t-2 border-secondary-700" />
            <div className="flex w-full items-center justify-between gap-12 rounded-lg bg-gradient-to-b from-secondary-500 to-secondary-700 px-12 py-8">
              <div className="mr-4">
                <h3 className="flex items-center gap-2 text-2xl text-primary-200">
                  <FilledBookmark className="inline-block size-6 text-accent" />
                  WatchList
                </h3>
                <p className="text-lg">
                  You have <b>{watchList.length}</b> movies in your watchlist
                </p>
              </div>
              <button
                type="button"
                className="rounded-xl bg-gradient-to-b from-error-400 to-error-700 px-4 py-2 text-xl font-semibold text-primary-200 transition-all duration-300 ease-in-out hover:brightness-90 focus:outline-none active:brightness-75"
                onClick={onClearWatchList}
                disabled={watchList.length === 0}
              >
                Clear WatchList
              </button>
            </div>
            {/* Delete my account */}
            <div className="flex w-full items-center justify-between gap-12 rounded-lg bg-gradient-to-b from-secondary-500 to-secondary-700 px-12 py-8">
              <div className="mr-4">
                <h3 className="flex items-center gap-2 text-2xl text-primary-200">
                  <FilledBookmark className="inline-block size-6 text-accent" />
                  Delete Account
                </h3>
                <p className="text-lg">
                  This action is irreversible. Please proceed with caution.
                </p>
              </div>
              <button
                type="button"
                className="rounded-xl bg-gradient-to-b from-error-400 to-error-700 px-4 py-2 text-xl font-semibold text-primary-200 transition-all duration-300 ease-in-out hover:brightness-90 focus:outline-none active:brightness-75"
                onClick={onDeleteAccount}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      ) : (
        <h1>Not authenticated</h1>
      )}
    </>
  )
}

export default Settings
