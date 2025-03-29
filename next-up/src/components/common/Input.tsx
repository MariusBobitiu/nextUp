import { ChangeEvent, useState } from 'react'
import {
  FaRegEye as EyeIcon,
  FaEyeSlash as EyeSlashIcon,
  FaRegUser as UserIcon,
  FaRegEnvelope as EmailIcon,
} from 'react-icons/fa'

type Props = {
  type: string
  name: string
  label: string
  placeholder: string
  invalid?: boolean
  error?: string
  required?: boolean
  disabled?: boolean
  className?: string
  autoComplete?: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input = (props: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => {
    const input = document.getElementById(props.name) as HTMLInputElement
    if (input.type === 'password') {
      input.type = 'text'
      setIsPasswordVisible(true)
    } else {
      input.type = 'password'
      setIsPasswordVisible(false)
    }
  }

  return (
    <div className="input relative flex w-full flex-col">
      <label
        htmlFor={props.name}
        className="relative top-2 ml-4 w-fit rounded-xl bg-secondary-800 px-[3px] text-sm font-semibold text-primary-300"
      >
        {props.label}
      </label>
      <input
        id={props.name}
        type={props.type}
        value={props.value}
        required={props.required}
        disabled={props.disabled}
        onChange={props.onChange}
        placeholder={props.placeholder}
        name={props.name}
        autoComplete={props.autoComplete ? props.autoComplete : 'off'}
        className={`w-full rounded-xl border-2 border-secondary-700 bg-secondary-800 px-3 py-4 text-base transition-all duration-300 ease-in-out placeholder:text-primary/25 autofill:bg-secondary-400 invalid:border-red-500 ${props.invalid && '!border-red-500'} hover:border-secondary-400 focus:border-secondary-300 focus:outline-none active:border-secondary-500 ${props.className || ''}`}
      />
      <div className="absolute right-4 top-1/2">
        {props.name.includes('assword') ? (
          isPasswordVisible ? (
            <EyeSlashIcon
              className="cursor-pointer text-xl text-primary-300"
              onClick={togglePasswordVisibility}
            />
          ) : (
            <EyeIcon
              className="cursor-pointer text-xl text-primary-300"
              onClick={togglePasswordVisibility}
            />
          )
        ) : props.type === 'email' ? (
          <EmailIcon className="text-xl text-primary-300" />
        ) : (
          <UserIcon className="text-xl text-primary-300" />
        )}
      </div>
      {props.error && (
        <p className="absolute -bottom-2 left-2 bg-secondary-800 px-2 text-sm text-red-500">
          {props.error}
        </p>
      )}
    </div>
  )
}

export default Input
