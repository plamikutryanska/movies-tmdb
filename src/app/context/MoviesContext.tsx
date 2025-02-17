
'use client'
import { FC, useContext, createContext, useState} from "react";

interface MoviesContextType {
  movieList: string[]
  selectedMovies: Record<string, boolean>
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleCheckBox: (movie: string) => void
}

const MoviesContext = createContext<MoviesContextType | undefined>(undefined)

export const MoviesProvider: FC<{children: React.ReactNode}> = ({children}) => {
  const [movieList, setMovieList] = useState<string[]>([])
  const [selectedMovies, setSelectedMovies] = useState<Record<string, boolean>>({})

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

  return (
    <MoviesContext.Provider value={{movieList, selectedMovies, handleCheckBox, handleInputChange}}>
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
