'use client'
import { FC } from "react"
import { useMovies } from "../context/MoviesContext"

const CheckboxList: FC = () => {
  const {movieList, selectedMovies, handleCheckBox} = useMovies()

  console.log('movieList ===>', movieList)
  console.log('selectedMovies ===>', selectedMovies)


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
    </div>
  )
}

export default CheckboxList