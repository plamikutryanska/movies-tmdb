import { FC } from "react"
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from "@heroicons/react/24/outline"

type SortButtonsProps = {
  sortFunction: (direction: 'ascending' | 'descending') => void
}

const SortButtons:FC<SortButtonsProps> = ({sortFunction}) => {
  return (
    <div className="flex justify-end items-center">
      <div className="text-white mr-2">Sort by Average Vote</div>
      <ArrowUpCircleIcon className="sort-btn" onClick={() => sortFunction('ascending')}/>
      <ArrowDownCircleIcon className="sort-btn" onClick={() => sortFunction('descending')}/>
    </div>
  )
}

export default SortButtons