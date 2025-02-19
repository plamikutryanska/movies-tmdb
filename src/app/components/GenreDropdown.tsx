import { FC } from "react"

type GenreDropdownProps = {
  genres: Record<number, string>
  selectedGenre: number | null
  onGenreChange: (genreId: number | null) => void
}

const GenreDropdown: FC<GenreDropdownProps> = ({genres, selectedGenre, onGenreChange}) => {
  return (
    <div className="flex justify-start items-center">
      <label className=" text-white mr-2">Filter by Genre</label>
      <select
        className="dropdown"
        value={selectedGenre ?? ""}
        onChange={(e) => onGenreChange(e.target.value ? Number(e.target.value) : null)}
      >
        <option value="">All Genres</option> 
          {Object.entries(genres).map(([id, name]) => 
            <option key={id} value={id}>
              {name}
            </option>
          )}
      </select>
    </div>
  )
}

export default GenreDropdown