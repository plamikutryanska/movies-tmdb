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
      className={`button ${disabled && 'cursor-not-allowed hover: bg-transparent disabled:bg-gray-300'}`}
      disabled={disabled}
    >
      {title}
    </button>
  )
}

export default Button