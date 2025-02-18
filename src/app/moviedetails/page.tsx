'use client'
import { FC, useEffect, useState } from "react"
import { useMovies } from "../context/MoviesContext"
import { TrashIcon } from "@heroicons/react/24/outline"
import Button from "../components/Button"
import DetailsSection from "../components/DetailsSection"
import { MovieData } from "../context/MoviesContext"

const MovieDetails: FC = () => {
  const {data} = useMovies()
  const [movies, setMovies] = useState<MovieData[]>([])


  useEffect(() => {
    if(data && data[0]){
      setMovies(data)
    }
  }, [data])

  const filteredMovies = movies.filter(m => m !== undefined)

  const removeMovies = (movieId: number) => {
    setMovies((prvMovies) => prvMovies.filter(movie => movie?.id !== movieId))
  }

  
  return (
    <div className="flex flex-col">
      {filteredMovies.length === 0 && <div className="text-xl font-semibold text-white flex justify-center">No Movies</div>}
      {
       filteredMovies?.map((movie) => {
          const movieDate = new Date(movie?.release_date)
          const isValidDate = movieDate instanceof Date
          const formattedDate = isValidDate && movie?.release_date !== undefined &&  movie.release_date !== '' ?
          new Intl.DateTimeFormat('en-GB')?.format(movieDate)?.replace(/\//g, '-') : ''

          return (
            <div
              key={movie?.id}
              className="flex flex-col 
             bg-white p-6 rounded-xl shadow-lg mb-4"
             >
            <div className="flex justify-between mb-2">
                <div className="text-lg font-semibold capitalize">
                  {movie?.title}
                </div>
               <TrashIcon
                  className="h-6 w-6 cursor-pointer flex self-end"
                  onClick={() => removeMovies(movie.id)}
                />
            </div>
            <DetailsSection
              posterPath={movie?.poster_path}
              overview={movie?.overview}
              releaseDate={formattedDate}
              popularity={movie?.popularity}
              voteAverage={movie?.vote_average}
              voteCount={movie?.vote_count}
            />
            </div>
          )
        })
      }
      {filteredMovies.length !== 0 && <Button title="Save" disabled={false} buttonFunc={() => console.log('save as JSON')}/>}
    </div>
  )
}

export default MovieDetails