'use client'
import { FC, useEffect, useState } from "react"
import { useMovies } from "../context/MoviesContext"
import { TrashIcon } from "@heroicons/react/24/outline"
import Button from "../components/Button"
import DetailsSection from "../components/DetailsSection"
import { MovieData } from "../constants/types"
import { handleSaveButton, formatDate, getGenreName } from "../utils/utils"
import SortButtons from "../components/SortButtons"
import GenreDropdown from "../components/GenreDropdown"

const MovieDetails: FC = () => {
  const {data, genreMap} = useMovies()
  const [movies, setMovies] = useState<MovieData[]>([])
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null)

  useEffect(() => {
    if(data){
      setMovies(data)
    }
  }, [data])

  const removeMovies = (movieId: number): void => {
    setMovies((prvMovies) => prvMovies.filter(movie => movie?.id !== movieId))
  }

  const handleVoteSort = (direction: 'ascending' | 'descending'): void => {
    const sortedMovies = [...movies]
    sortedMovies.sort((a,b) => {
      return direction === 'ascending' ?
        a.vote_average - b.vote_average :
        b.vote_average - a.vote_average
    })
    setMovies(sortedMovies)
  }

  const filteredMovies: MovieData[] = selectedGenre ? movies.filter((movie) => movie.genre_ids.includes(selectedGenre)) : movies

    
  if(movies.length === 0) {
    return <div className="text">No Movies</div>
  }

  if(filteredMovies.length === 0) {
    return (
      <div>
        <GenreDropdown genres={genreMap} selectedGenre={selectedGenre} onGenreChange={setSelectedGenre}/>
        <div className="text mt-6 uppercase">No movies in this genre</div>
      </div>
    )
  }  

  return (
    <div className="flex flex-col">
      {movies.length > 1 && 
      <div className="flex justify-between mb-4">
        <GenreDropdown genres={genreMap} selectedGenre={selectedGenre} onGenreChange={setSelectedGenre}/>
        <SortButtons sortFunction={handleVoteSort}/>
      </div>
      }
      {
       filteredMovies?.map((movie) => {
          return (
            <div key={movie?.id} className="details-container">
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
      <Button title="Save" disabled={false} buttonFunc={() => handleSaveButton(filteredMovies, genreMap)}/>
    </div>
  )
}

export default MovieDetails