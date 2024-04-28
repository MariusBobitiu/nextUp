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
        className="relative top-2 ml-4 w-fit rounded-xl bg-navy-700 px-[3px] text-sm font-semibold text-light-blue-300"
      >
        {props.label}
      </label>
      <input
        id={props.name}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        name={props.name}
        autoComplete={props.autoComplete ? props.autoComplete : 'off'}
        className={`input w-full rounded-xl border-2 border-navy-600 bg-navy-700 px-[10px] py-[11px] text-xs transition-all duration-300 ease-in-out placeholder:text-light-blue/25 autofill:bg-navy-400 invalid:border-red-500 hover:border-navy-400 focus:border-navy-300 focus:outline-none active:border-navy-500 ${props.className && props.className}`}
      />
      <div className="absolute bottom-[20%] right-4">
        {props.name.includes('assword') ? (
          isPasswordVisible ? (
            <EyeSlashIcon
              className="cursor-pointer text-xl text-light-blue-300"
              onClick={togglePasswordVisibility}
            />
          ) : (
            <EyeIcon
              className="cursor-pointer text-xl text-light-blue-300"
              onClick={togglePasswordVisibility}
            />
          )
        ) : props.type === 'email' ? (
          <EmailIcon className="text-xl text-light-blue-300" />
        ) : (
          <UserIcon className="text-xl text-light-blue-300" />
        )}
      </div>
    </div>
  )
}

export default Input
