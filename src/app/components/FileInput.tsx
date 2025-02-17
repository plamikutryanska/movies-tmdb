'use client'
import { FC } from "react"
import { useMovies } from "../context/MoviesContext"

const FileInput: FC = () => {
  const {handleInputChange} = useMovies()

  return (
    <div className="flex flex-col items-center">
      <div className="text-xl font-semibold text-white mb-4">Upload a movie list</div>
      <input type="file" accept=".txt" onChange={handleInputChange} className="mb-4 block bg-white"/>
    </div>
  )
}



export default FileInput
