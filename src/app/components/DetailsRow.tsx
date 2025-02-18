import { FC } from "react"

type DetailsRowProps = {
  label:string
  value: string | number
}

const DetailsRow: FC<DetailsRowProps> = ({label, value}) => {
  return (  
  <div className="flex">
    <div className="font-semibold mr-2">{label}</div>
    <div>{value}</div>
  </div>
  )
}

export default DetailsRow