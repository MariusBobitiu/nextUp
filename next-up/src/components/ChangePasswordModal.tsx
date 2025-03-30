import { useEffect, useState } from 'react'
import { IoCloseCircleOutline as CloseIcon } from 'react-icons/io5'
import Input from './common/Input'
import { useMutation } from 'react-query'
import { useSelector } from 'react-redux'
import { userState } from '@/types/Auth'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const ChangePasswordModal = (props: Props) => {
	const user = useSelector((state: userState) => state.user.user);

  const [isVisible, setIsVisible] = useState(false)
	const [oldPassword, setOldPassword] = useState('')
	const [formData, setFormData] = useState<{
		newPassword: string
		confirmPassword: string
	}>({
		newPassword: '',
		confirmPassword: '',
	});
	const [error, setError] = useState<{
		newPassword: {
			invalid: boolean
			message: string
		},
		confirmPassword: {
			invalid: boolean
			message: string
		}
	}>({
		newPassword: {
			invalid: false,
			message: '',
		},
		confirmPassword: {
			invalid: false,
			message: '',
		},
	});
	const [oldPasswordError, setOldPasswordError] = useState<{
		invalid: boolean
		message: string
	}>({
		invalid: false,
		message: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	useEffect(() => {
		// Reset old password error state when old password changes
		setOldPasswordError({
			invalid: false,
			message: '',
		});
		// Reset error state when form data changes
		setError({
			newPassword: {
				invalid: false,
				message: '',
			},
			confirmPassword: {
				invalid: false,
				message: '',
			},
		});
	}, [oldPassword, formData]);

	const changePasswordMutation = useMutation({
		mutationKey: ['changePassword'],
		mutationFn: async (data: { oldPassword: string; newPassword: string }) => {
			const response = await fetch(`${import.meta.env.VITE_SV_API_BASE_URL}/users/${user?.username}/update-password`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					currentPassword: data.oldPassword,
					newPassword: data.newPassword,
				}),
			});
			const res = await response.json();
			if (!response.ok) {
				throw new Error(res.message || 'Failed to change password');
			}
		},
		onSuccess: () => {
			// Handle success (e.g., show a success message, close the modal, etc.)
			props.onClose()
		},
		onError: (err) => {
			// Handle error (e.g., show an error message)
			console.error('Error changing password:', err);
			if ((err as Error).message === 'Invalid credentials') {
				setOldPasswordError({
					invalid: true,
					message: 'Invalid current password',
				});
			} else {
				setError({
					...error,
					newPassword: {
						invalid: true,
						message: (err as Error).message || 'Failed to change password',
					},
				});
			}
		},
	});

	const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		// Validate the form
		if (formData.newPassword !== formData.confirmPassword) {
			setError({
				...error,
				confirmPassword: {
					invalid: true,
					message: 'Passwords do not match',
				},
			})
			return
		}
		if (formData.newPassword.length < 8) {
			setError({
				...error,
				newPassword: {
					invalid: true,
					message: 'Password must be at least 8 characters long',
				},
			})
			return
		}
		if (formData.newPassword.length > 20) {
			setError({
				...error,
				newPassword: {
					invalid: true,
					message: 'Password must be less than 20 characters long',
				},
			})
			return
		}
		if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(formData.newPassword)) {
			setError({
				...error,
				newPassword: {
					invalid: true,
					message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
				},
			})
			return
		}

		changePasswordMutation.mutate({
			oldPassword,
			newPassword: formData.newPassword,
		});
	};

	useEffect(() => {
		if (props.isOpen) {
			setIsVisible(true)
		} else {
			setTimeout(() => setIsVisible(false), 600)
		}
	}, [props.isOpen])

  if (!props.isOpen) return null
  return (
    <div className="fixed left-0 top-0 z-9999 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50">
      <div
        className={`relative flex flex-col w-3/4 gap-2 rounded-lg bg-secondary-800 p-8 ${isVisible ? 'scale-100 opacity-100' : 'scale-80 opacity-0'} duration-600 transition-all ease-in-out`}
      >
        <div className="w-full flex justify-between items-center gap-2 p-2">
					<h1 className="text-2xl font-bold text-primary-100">Change Password</h1>
          <button onClick={props.onClose}>
            <CloseIcon className="size-8 text-primary-100 hover:text-primary-400" />
          </button>
        </div>
				<form className="flex w-full flex-col gap-2" onSubmit={onSubmitForm}>
					<h4 className="text-xl text-primary-100">Please confirm your current password</h4>
					<Input
						type="password"
						name="oldPassword"
						label='Old Password'
						placeholder="Old Password"
						value={oldPassword}
						onChange={(e) => setOldPassword(e.target.value)}
						invalid={oldPasswordError.invalid}
						error={oldPasswordError.message}
					/>
					<hr className="my-2 border-t border-secondary-700" />
					<h4 className="text-xl text-primary-100">Please enter your new password</h4>
					<Input
						type="password"
						name="newPassword"
						label='New Password'
						placeholder="New Password"
						value={formData.newPassword}
						onChange={handleChange}
						invalid={error.newPassword.invalid}
						error={error.newPassword.message}
					/>
					<Input
						type="password"
						name="confirmPassword"
						placeholder="Confirm Password"
						label='Confirm Password'
						value={formData.confirmPassword}
						onChange={handleChange}
						invalid={error.confirmPassword.invalid}
						error={error.confirmPassword.message}
					/>
					<button
						type="submit"
						className="w-full rounded-xl bg-gradient-to-b from-accent-400 to-accent-700 px-4 py-2 text-xl font-semibold text-primary-200 transition-all duration-300 ease-in-out hover:bg-accent-700 hover:brightness-90 focus:outline-none active:bg-accent-800 active:brightness-75 mt-4"
					>
						Change Password
					</button>
				</form>
      </div>
    </div>
  )
}

export default ChangePasswordModal
