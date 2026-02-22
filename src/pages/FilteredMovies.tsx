import "./FilteredMovies.css";
import { useGetMoviesByDiscoverQuery } from "../store/movieApiSlice";
import MovieCard from "../component/MovieCard";
import { useState } from "react";
import type { MovieProps } from "../type/Movie";

type SortOrder =
  | "popularity.asc"
  | "popularity.desc"
  | "vote_average.asc"
  | "vote_average.desc"
  | "primary_release_date.asc"
  | "primary_release_date.desc"
  | "title.asc"
  | "title.desc";

const SORT_GROUPS = [
  {
    label: "Popularity",
    options: [
      { value: "popularity.desc", text: "Popularity Descending" },
      { value: "popularity.asc", text: "Popularity Ascending" },
    ],
  },
  {
    label: "Rating",
    options: [
      { value: "vote_average.desc", text: "Vote Average Descending" },
      { value: "vote_average.asc", text: "Vote Average Ascending" },
    ],
  },
  {
    label: "Release Date",
    options: [
      { value: "primary_release_date.desc", text: "Release Date Descending" },
      { value: "primary_release_date.asc", text: "Release Date Ascending" },
    ],
  },
  {
    label: "Title",
    options: [
      { value: "title.desc", text: "Title Descending" },
      { value: "title.asc", text: "Title Ascending" },
    ],
  },
];

const FilteredMovies = () => {
  const [sortOrder, setSortOrder] = useState<SortOrder>("popularity.desc");
  const { data, error, isLoading } = useGetMoviesByDiscoverQuery({
    sort_by: sortOrder,
  });

  return (
    <div className="filtered-movies">
      <h1>Filtered Movies</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error</p>}

      <div className="filters-container">
        {SORT_GROUPS.map((group) => (
          <div key={group.label} className="filter-group">
            <label>{group.label}: </label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as SortOrder)}
            >
              {group.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.text}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {data && (
        <ul className="movie-list">
          {data?.results &&
            data.results.map((movie: MovieProps) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
        </ul>
      )}
    </div>
  );
};

export default FilteredMovies;
