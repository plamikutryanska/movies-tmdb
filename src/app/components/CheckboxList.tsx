'use client'
import { FC, useEffect, useState } from "react"
import { useMovies } from "../context/MoviesContext"
import { useRouter } from "next/navigation"
import Button from "./Button"

const CheckboxList: FC = () => {
  const {movieList, selectedMovies, handleCheckBox, searchMovies} = useMovies()
  const [allSelected, setAllSelected] = useState<boolean>(true)
  
  const selectedMoviesLength = Object.values(selectedMovies).filter(item => item === true).length
  const disabled = selectedMoviesLength === 0

  const router = useRouter()

  const handleSearchButton = () => {
    searchMovies()
    router.push("/moviedetails")
  }

  useEffect(() => {
    const areAllMoviesSelected = movieList.every((movie) => selectedMovies[movie])
    setAllSelected(areAllMoviesSelected)
  }, [selectedMovies, movieList])

  const toggleSelectAll = () => {
    const action = allSelected ? 'deselect' : 'select'

    movieList.forEach((movie) => {
      handleCheckBox(movie, action)
    })
    setAllSelected(!allSelected)
  }

  const handleCheckboxChange = (movie: string) => {
    handleCheckBox(movie, selectedMovies[movie] ? 'deselect' : 'select')
  }

  return (
    movieList.length > 0 &&
    <div className="bg-white rounded-xl p-4 shadow-lg max-w-sm">
    <ul className="max-h-64 overflow-y-auto space-y-2 p-2">
    <button onClick={toggleSelectAll}>{allSelected ? 'Deselect All' : 'Select All'}</button>
    {movieList.map(((item, index) => {
      return (
          <li
            key={`${item}-${index}`}
            className="flex items-center font-semibold text-lg capitalize"
          >
            <input
              type="checkbox"
              className="mr-2 h-4 w-4 accent-purple-600 rounded cursor-pointer"
              checked={selectedMovies[item]}
              onChange={() => handleCheckboxChange(item)}
            />
            {item}
          </li>
      )
    }))}
    </ul>
    {
      movieList.length !== 0 && 
      <Button title="Search" buttonFunc={handleSearchButton} disabled={disabled}/> 
    }
  </div>

  )
}

export default CheckboxList