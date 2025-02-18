import { FC } from "react"

type Buttontype = {
  title: string
  buttonFunc: () => void
  disabled: boolean
}

const Button: FC<Buttontype> = ({title, disabled, buttonFunc}) => {
  return (
    <button
      onClick={buttonFunc}
      className={`bg-purple-600 w-72 p-2 mt-4 rounded-full shadow-lg text-white
        hover:shadow-xl transition-shadow hover:bg-purple-700 self-center
        ${disabled && 'cursor-not-allowed hover: bg-transparent disabled:bg-gray-300'}`
      }
      disabled={disabled}
    >
      {title}
    </button>
  )
}

export default Button