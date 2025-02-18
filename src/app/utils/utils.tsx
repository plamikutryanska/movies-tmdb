import { MovieData } from "../constants/types"

export const getGenreName = (genreIds: number[], genreMap: Record<number, string>): string => {
  return genreIds.map(id => genreMap[id] || 'unknown').join(", ")
}


export const handleSaveButton = async (movies: MovieData[], genreMap: Record<number, string>): Promise<void> => {

  if(!movies) return

  const moviesWithGenres = movies.map((movie) => ({
    ...movie,
    genres: getGenreName(movie.genre_ids, genreMap)
  }))

  const url = 'https://jsonplaceholder.typicode.com/posts'
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(moviesWithGenres)
    })

    if(!response.ok) {
      throw new Error('Could not save data')
    }

    const responseData = await response.json()
    console.log('Response data ===>', responseData)

  } catch (error) {
    console.log('Error saving data: ', error)
  }
}

export const formatDate = (releaseDate: string): string => {
  const movieDate = new Date(releaseDate)
  const isValidDate = movieDate instanceof Date
  const formattedDate = isValidDate && releaseDate !== undefined &&  releaseDate !== '' ?
  new Intl.DateTimeFormat('en-GB')?.format(movieDate)?.replace(/\//g, '-') : ''

  return formattedDate
}