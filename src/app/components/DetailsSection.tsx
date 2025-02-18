import { FC } from "react";
import DetailsRow from "./DetailsRow";
import { StarIcon } from "@heroicons/react/24/solid"

type DetailsSectionProps =  {
  posterPath: string
  overview: string
  releaseDate: string
  popularity: number
  voteAverage: number
  voteCount: number
  genre: string
}

const DetailsSection: FC<DetailsSectionProps> = ({
  posterPath,
  overview,
  releaseDate,
  popularity,
  voteAverage,
  voteCount,
  genre
}) => {
  return (
    <div className="flex space-x-4">
    <img
      src={`https://image.tmdb.org/t/p/w200${posterPath}`}
      alt={'movie poster'}
      className="w-32 h-auto rounded-lg shadow-lg"
    />
    <div className="flex flex-col space-y-2">
      <div className="text-sm text-wrap">{overview}</div>
      <DetailsRow label="Release Date:" value={releaseDate}/>
      <DetailsRow label="Genre:" value={genre}/>
      <DetailsRow label="Popularity:" value={popularity}/>
      <div className="flex items-center">
        <div className="font-semibold mr-2">Average Vote:</div>
        <StarIcon className="h-5 w-5 mr-1 text-yellow-400"/>
        <div>{`${voteAverage.toFixed(1)}/10`}</div>
      </div>
      <DetailsRow label="Vote Count:" value={voteCount}/>
    </div>
  </div>
  )
}

export default DetailsSection