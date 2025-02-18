'use client'
import { FC } from "react"
import { useMovies } from "../context/MoviesContext"
import {ArrowUpOnSquareIcon} from '@heroicons/react/24/solid'

const FileInput: FC = () => {
  const {handleInputChange} = useMovies()

  return (
    <div className="flex flex-col items-center">
      <div className="text-xl font-semibold text-white mb-4">Upload a movie list</div>
      <input type="file" accept=".txt" onChange={handleInputChange} id={'file-upload'} className="hidden"/>
      <label
        htmlFor="file-upload"
        className="flex items-center space-x-2 cursor-pointer
                  rounded-lg bg-purple-600 hover:bg-purple-700
                  text-white px-4 py-2 text-sm font-medium
                  shadow-md transition-all mb-6"
      >
        <ArrowUpOnSquareIcon className="h-5 w-5"/>
        <span>Choose File</span>
      </label>
    </div>
  )
}

export default FileInput
