'use client'
import { FC } from "react"
import { useMovies } from "../context/MoviesContext"
import { useRouter } from "next/navigation"
import Button from "./Button"

const CheckboxList: FC = () => {
  const {movieList, selectedMovies, handleCheckBox, searchMovies, data} = useMovies()
  const selectedMoviesLength = Object.values(selectedMovies).filter(item => item === true).length
  const disabled = selectedMoviesLength === 0

  const router = useRouter()

  const handleSearchButton = () => {
    searchMovies()
    router.push("/moviedetails")
  }

  return (
    <div>
      {movieList.map(((item, index) => {
        return (
          <ul key={`${item}-${index}`} className="space-y-2">
            <li className="flex items-center font-semibold text-white text-lg capitalize">
            <input
              type="checkbox"
              className="mr-2 bg-white"
              checked={selectedMovies[item]}
              onChange={() => handleCheckBox(item)}
            />
            {item}
            </li>
          </ul>
        )
      }))}
      {
        movieList.length !== 0 && 
        <Button title="Search" buttonFunc={handleSearchButton} disabled={disabled}/> 
      }
    </div>
  )
}

export default CheckboxList