import React, { useState } from "react";
import MovieResult from "./MovieResult";
import { MdArrowCircleLeft, MdArrowCircleRight } from "react-icons/md";
import ConfigIcon from "./ReactIconCofinguration";

function MovieSearch() {
	const [query, setQuery] = useState("");
	const [timer, setTimer] = useState(0);
	const [movies, setMovies] = useState([]);
	const [page, setPage] = useState(1);

	function debounce(func, delay) {
		return function (...args) {
			const context = this;
			clearTimeout(timer);
			setTimer(setTimeout(() => func.apply(context, args), delay));
		};
	}

	const debouncedSearch = debounce((searchTerm) => {
		fetch(`https://omdbapi.com/?s=${searchTerm}&apikey=c9fe20e4&page=${page}`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				return setMovies(data.Search || []);
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
			<ul>
				{movies.map((movie) => (
					<MovieResult key={movie.imdbID} movie={movie} />
				))}
			</ul>
		</div>
	);
}
export default MovieSearch;
