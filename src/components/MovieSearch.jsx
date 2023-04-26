import React, { useState } from "react";
import MovieResult from "./MovieResult";
import { MdArrowCircleLeft, MdArrowCircleRight } from "react-icons/md";
import ConfigIcon from "./ReactIconCofinguration";
import { PacmanLoader } from "react-spinners";

function MovieSearch() {
	const [query, setQuery] = useState("");
	const [timer, setTimer] = useState(0);
	const [movies, setMovies] = useState([]);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(false);

	function debounce(func, delay) {
		return function (...args) {
			const context = this;
			clearTimeout(timer);
			setTimer(setTimeout(() => func.apply(context, args), delay));
		};
	}

	const debouncedSearch = debounce((searchTerm) => {
		setIsLoading(true);
		setHasError(false);
		fetch(`https://omdbapi.com/?s=${searchTerm}&apikey=c9fe20e4&page=${page}`)
			.then((response) => response.json())
			.then((data) => {
				if (data.Response === true) {
					return setMovies(data.Search || []);
				}
				console.log(data.Response);
				setHasError(true);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, 3000);

	function handleQueryChange(event) {
		setQuery(event.target.value);
		debouncedSearch(event.target.value);
	}
	const pageForward = () => {
		return setPage(page + 1);
	};
	const pageBackwards = () => {
		if (page !== 1) {
			return setPage(page - 1);
		}
	};

	return (
		<div>
			<div>
				<button onClick={() => pageBackwards()}>
					<ConfigIcon>
						<MdArrowCircleLeft value={{ color: "green", size: "10em" }} />
					</ConfigIcon>
				</button>
				<button onClick={() => pageForward()}>
					<ConfigIcon>
						<MdArrowCircleRight value={{ color: "green", size: "10em" }} />
					</ConfigIcon>
				</button>
			</div>
			<input type="text" value={query} onChange={(event) => handleQueryChange(event)} />
			{isLoading ? (
				<div
					style={{
						"display": "flex",
						"justify-content": "center",
						"align-items": "center",
						"height": "300"
					}}
				>
					<PacmanLoader loading={isLoading} size={300} color={"#000"} />
				</div>
			) : hasError ? (
				<h2> Filmes não encontrados </h2>
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
