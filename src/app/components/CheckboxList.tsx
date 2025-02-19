'use client'
import { FC, useEffect, useState } from "react"
import { useMovies } from "../context/MoviesContext"
import { useRouter } from "next/navigation"
import Button from "./Button"
import CheckboxItem from "./CheckboxItem"

const CheckboxList: FC = () => {
  const {movieList, selectedMovies, handleCheckBox, searchMovies} = useMovies()
  const [allSelected, setAllSelected] = useState<boolean>(true)

  const selectedMoviesLength: number = Object.values(selectedMovies).filter(item => item === true).length
  const disabled: boolean = selectedMoviesLength === 0

  const router = useRouter()

  const handleSearchButton = (): void => {
    searchMovies()
    router.push("/moviedetails")
  }

  useEffect(() => {
    const areAllMoviesSelected = movieList.every((movie) => selectedMovies[movie])
    setAllSelected(areAllMoviesSelected)
  }, [selectedMovies, movieList])

  const toggleSelectAll = (): void => {
    const action = allSelected ? 'deselect' : 'select'

    movieList.forEach((movie) => {
      handleCheckBox(movie, action)
    })
    setAllSelected(!allSelected)
  }

  const handleCheckboxChange = (movie: string): void => {
    handleCheckBox(movie, selectedMovies[movie] ? 'deselect' : 'select')
  }

  return (
   <>
   {
        movieList.length > 0 &&
        <div className="bg-white rounded-xl p-4 shadow-lg max-w-sm">
        <div className="flex justify-end mb-2">
          <button
            onClick={toggleSelectAll}
          >
            {allSelected ? 'Deselect All' : 'Select All'}
          </button>
        </div>
        <ul className="max-h-64 overflow-y-auto space-y-2 p-2">
        {movieList.map(((item, index) => (
          <CheckboxItem
            key={`${item}-${index}`}
            item={item}
            isChecked={selectedMovies[item]}
            onChange={() => handleCheckboxChange(item)}
          />
        )))}
        </ul>
        <Button
          title="Search"
          buttonFunc={handleSearchButton}
          disabled={disabled}
        /> 
      </div>
   }
   </>

  )
}

export default CheckboxList