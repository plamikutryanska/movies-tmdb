import { FC } from "react"

type CheckboxItemProp = {
  item: string,
  isChecked: boolean,
  onChange: () => void
}


const CheckboxItem: FC<CheckboxItemProp> = ({item, isChecked, onChange}) => {
  return (
    <li className="list-container">
    <input
      type="checkbox"
      className="checkbox"
      checked={isChecked}
      onChange={onChange}
    />
     {item}
    </li>
  )

}

export default CheckboxItem

