
'use client'

import { FC, useContext, createContext, useState} from "react";
import { useQuery } from "@tanstack/react-query";
import axios from  'axios'

type MovieData = {
  adult: boolean,
  "backdrop_path": string,
  "genre_ids": number []
  id: number,
  "original_language": string,
  "original_title": string,
  overview: string,
  popularity: number,
  "poster_path": string,
  "release_date": string,
  title: string,
  video: boolean,
  "vote_average": number,
  "vote_count": number
}

interface MoviesContextType {
  movieList: string[]
  selectedMovies: Record<string, boolean>
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleCheckBox: (movie: string) => void
  searchMovies: () => void
  isLoading: boolean
  error: any
  data: MovieData[] | undefined
}

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

const fetchMovies = async (movieTitle: string) => {

  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: apiKey,
      query: movieTitle
    }
  })
  return response.data.results[0] // assuming 1st response is the best
}

const MoviesContext = createContext<MoviesContextType | undefined>(undefined)

export const MoviesProvider: FC<{children: React.ReactNode}> = ({children}) => {
  const [movieList, setMovieList] = useState<string[]>([])
  const [selectedMovies, setSelectedMovies] = useState<Record<string, boolean>>({})
  const [searchTriggered, setSearchTriggered] = useState<boolean>(false)

  const selectedMovieTitles = Object.entries(selectedMovies).filter(([key, value]) => value).map(([key]) => key)

  const {data, isLoading, error} = useQuery({
    queryKey: ['movies', selectedMovieTitles],
    queryFn: async () => {
      const fetchData = selectedMovieTitles.map((movieTitle) =>
        fetchMovies(movieTitle)
      );
      return Promise.all(fetchData);
    },
    enabled: searchTriggered,
    staleTime: Infinity
    
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0]
    if(!file) return;
  
    const fileReader = new FileReader()
    fileReader.onload = (e) => {
      const text = e.target?.result as string
      const movieList = text.split('\n').map((movie) => movie.trim().replace(/[^a-zA-Z0-9\s]/g, "")).filter(Boolean)
      setMovieList(movieList)
      setSelectedMovies(Object.fromEntries(movieList.map((movie) => [movie, true]))) 
    }
    fileReader.readAsText(file)
  }

  const handleCheckBox = (movie: string): void => {
    setSelectedMovies((prev) => ({...prev, [movie]: !prev[movie]}))
  }

  const searchMovies = () => {
    setSearchTriggered(true)
  }

  const contextValue = {
    movieList,
    selectedMovies,
    handleCheckBox,
    handleInputChange,
    searchMovies,
    isLoading,
    error,
    data
  }

  return (
    <MoviesContext.Provider value={contextValue}>
      {children}
    </MoviesContext.Provider>
  )
}

export const useMovies = () => {
  const context = useContext(MoviesContext)

  if(!context){
    throw new Error('useMovies hook must be used within Movies Provider')
  }

  return context
}
