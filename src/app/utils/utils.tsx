import { MovieData } from "../context/MoviesContext"

export const handleSaveButton = async (movies: MovieData[]): Promise<void> => {
  const url = 'https://jsonplaceholder.typicode.com/posts'
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(movies)
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
