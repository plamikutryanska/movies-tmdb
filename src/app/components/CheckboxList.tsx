'use client'
import { FC } from "react"
import { useMovies } from "../context/MoviesContext"
import { useRouter } from "next/navigation"

const CheckboxList: FC = () => {
  const {movieList, selectedMovies, handleCheckBox, searchMovies, data} = useMovies()
  const selectedMoviesLength = Object.values(selectedMovies).filter(item => item === true).length
  const disabled = selectedMoviesLength === 0

  const router = useRouter()

  const handleSearchButton = () => {
    searchMovies()
    router.push("/moviedetails")
  }

  console.log('data ===>', data)

  return (
    <div>
      {movieList.map(((item, index) => {
        return (
          <ul key={`${item}-${index}`} className="space-y-2">
            <li className="flex items-center font-semibold text-white text-lg">
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
        movieList.length !== 0 && (
        <button
          onClick={handleSearchButton}
          className={`bg-white w-72 p-2 mt-4 rounded-full shadow-lg
            hover:shadow-xl transition-shadow
            cursor-pointer hover:bg-purple-200 ${disabled && 'cursor-not-allowed hover: bg-transparent disabled:bg-gray-300'}`}
          disabled={disabled}
        >
          Search
        </button>
        )
      }
    </div>
  )
}

export default CheckboxList