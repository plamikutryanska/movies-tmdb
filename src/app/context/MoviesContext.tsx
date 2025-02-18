
'use client'

import { FC, useContext, createContext, useState} from "react";
import { useQuery } from "@tanstack/react-query";
import axios from  'axios'

export type MovieData = {
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
  "vote_count": number,
  genres?: string
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
  genreMap: Record<number, string>
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

  return response.data.results.length > 0 ? response.data.results[0] : null
}

const fetchGenres = async (): Promise<Record<number, string>> => {

  const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
    params: {
      api_key: apiKey,
    }
  })

  return response.data.genres.reduce(
    (acc: Record<number, string>, genre: {id: number, name: string}) => {
      acc[genre.id] = genre.name
      return acc
    },
    {}
  )
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
      const fetchData = await Promise.all(
        selectedMovieTitles.map((movieTitle) => fetchMovies(movieTitle))
      );
      return fetchData.filter(Boolean)
    },
    enabled: searchTriggered,
    staleTime: Infinity 
  })

  const {data: genreMap = {}} = useQuery({
    queryKey: ['genres'],
    queryFn: fetchGenres,
    staleTime: Infinity 
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0]
    if(!file) return;
  
    const fileReader = new FileReader()
    fileReader.onload = (e) => {
      const text = e.target?.result as string

      const movieList = text.split('\n')
      .map((movie) => movie.trim())
      .map((movie) => movie.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
      .map((movie) => movie.toLocaleLowerCase())
      .map((movie) => {
        const cleanedMovie = movie.replace(/@/g, 'a')
                                  .replace(/[^a-z0-9\s@\-]/g, "")
        return cleanedMovie;
      })
      .filter(Boolean)

      setMovieList(movieList)
      setSelectedMovies(Object.fromEntries(movieList.map((movie) => [movie, true]))) 
    }
    fileReader.readAsText(file)
  }

  const handleCheckBox = (movie: string): void => {
    setSelectedMovies((prev) => ({...prev, [movie]: !prev[movie]}))
  }

  const searchMovies = (): void => {
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
    data,
    genreMap
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
