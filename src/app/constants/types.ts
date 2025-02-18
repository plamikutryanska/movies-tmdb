export type MovieData = {
  adult: boolean,
  "backdrop_path": string,
  "genre_ids": number[]
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

export interface MoviesContextType {
  movieList: string[]
  selectedMovies: Record<string, boolean>
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleCheckBox: (movie: string, action: 'deselect' | 'select') => void
  searchMovies: () => void
  isLoading: boolean
  error: any
  data: MovieData[] | undefined
  genreMap: Record<number, string>
}
