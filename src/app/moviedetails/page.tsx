'use client'
import { FC, useEffect, useState } from "react"
import { useMovies } from "../context/MoviesContext"
import { TrashIcon } from "@heroicons/react/24/outline"
import Button from "../components/Button"


const MovieDetails: FC = () => {
  const {data} = useMovies()
  const [movies, setMovies] = useState(data || [])

  useEffect(() => {
    if(data){
      setMovies(data)
    }
  }, [data])

  const removeMovies = (movieId: number) => {
    setMovies((prvMovies) => prvMovies.filter(movie => movie.id !== movieId))
  }

  console.log('details ===>', movies)

  return (
    <div className="flex flex-col">
      {movies.length === 0 && <div className="text-xl font-semibold text-white flex justify-center">No Movies</div>}
      {
        movies?.map((movie) => {
          return (
            <div
              key={movie.id}
              className="flex flex-col 
             bg-white p-6 rounded-xl shadow-lg mb-4"
             >
            <div className="flex justify-between">
                <div
                  className="text-lg font-semibold capitalize"
                >
                    {movie.title}
                </div>
               <TrashIcon
                  className="h-6 w-6 cursor-pointer flex self-end"
                  onClick={() => removeMovies(movie.id)}
                />
            </div>
            </div>
          )
        })
      }
      {movies.length !== 0 && <Button title="Save" disabled={false} buttonFunc={() => console.log('save as JSON')}/>}
    </div>
  )
}

export default MovieDetails