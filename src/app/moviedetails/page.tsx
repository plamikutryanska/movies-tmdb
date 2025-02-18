'use client'
import { FC, useEffect, useState } from "react"
import { useMovies } from "../context/MoviesContext"
import { TrashIcon } from "@heroicons/react/24/outline"
import Button from "../components/Button"
import DetailsSection from "../components/DetailsSection"
import { MovieData } from "../constants/types"
import { handleSaveButton, formatDate, getGenreName } from "../utils/utils"

const MovieDetails: FC = () => {
  const {data, genreMap} = useMovies()
  const [movies, setMovies] = useState<MovieData[]>([])

  useEffect(() => {
    if(data){
      setMovies(data)
    }
  }, [data])

  const removeMovies = (movieId: number) => {
    setMovies((prvMovies) => prvMovies.filter(movie => movie?.id !== movieId))
  }

  return (
    <div className="flex flex-col">
      {movies.length === 0 && <div className="text-xl font-semibold text-white flex justify-center">No Movies</div>}
      {
       movies?.map((movie) => {
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
              releaseDate={formatDate(movie?.release_date)}
              popularity={movie?.popularity}
              voteAverage={movie?.vote_average}
              voteCount={movie?.vote_count}
              genre={getGenreName(movie.genre_ids, genreMap)}
            />
            </div>
          )
        })
      }
      {movies.length !== 0 && <Button title="Save" disabled={false} buttonFunc={() => handleSaveButton(movies, genreMap)}/>}
    </div>
  )
}

export default MovieDetails