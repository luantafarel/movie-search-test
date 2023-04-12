import React, { useEffect, useState } from "react";
import { useDebounced } from "../hooks/useDebounced";
import MovieResult from "./MovieResult";

function MovieSearch() {
  const [query, setQuery] = useState("");

  // we will always use the debounced query as dependency to make sure everything updates only when the user stops typing
  const debouncedQuery = useDebounced(query);

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1); // state always const
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // Resets pagination when query changes
    setPage(1);
  }, [debouncedQuery]);

  useEffect(() => {
    if (debouncedQuery) {
      // avoid trigering an unecessary query when the the component loads or when the user deletes all
      setIsLoading(true);
      fetch(
        `https://omdbapi.com/?s=${debouncedQuery}&apikey=c9fe20e4&page=${page}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setMovies(data.Search || []); // Do not return set
        })
        .catch((error) => {
          console.error(error);
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [debouncedQuery, page]); // the query is only triggered when the user stops typing

  const pageForward = () => {
    setPage((prevValue) => prevValue + 1); // useState callback instead of mutable state
  };

  const pageBackwards = () => {
    if (page > 1) {
      // > 1 covers more cases than !== 1
      setPage((prevValue) => prevValue - 1); // useState callback instead of mutable state
    }
  };

  return (
    <div>
      <p>Page {page}</p>
      <div>
        {
          // callback shorthand and button text. Also only enables the button when the page is ready to paginate
        }
        <button
          onClick={pageBackwards}
          disabled={page === 1 || isLoading || !query}
        >
          {"<< Prev"}
        </button>
        <button onClick={pageForward} disabled={isLoading || !query}>
          {"Next >>"}
        </button>
      </div>
      {
        // here is ok to use query directly because we want this to change every time the user press a key
      }
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Movie title"
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <h2>Something went wrong, try again!</h2>
      ) : (
        <ul>
          {movies.map((movie) => (
            <MovieResult key={movie.imdbID} movie={movie} />
          ))}
        </ul>
      )}
    </div>
  );
}
export default MovieSearch;
