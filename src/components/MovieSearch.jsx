import React, { useEffect, useState } from "react";
import MovieResult from "./MovieResult";

function MovieSearch() {
	const [query, setQuery] = useState("");
	const [movies, setMovies] = useState([]);
	let [page, setPage] = useState(1);

	useEffect(() => {
		fetch(`https://omdbapi.com/?s=${query}&apikey=c9fe20e4&page=${page}`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				return setMovies(data.Search || []);
			});
	}, [query, page]);
	const pageForward = () => {
		console.log(page);
		return setPage(page++);
	};
	const pageBackwards = () => {
		console.log(page);
		if (page !== 1) {
			return setPage(page--);
		}
	};

	return (
		<div>
			<div>
				<button onClick={() => pageBackwards()} />
				<button onClick={() => pageForward()} />
			</div>
			<input type="text" value={query} onChange={(event) => setQuery(event.target.value)} />
			<ul>
				{movies.map((movie) => (
					<MovieResult key={movie.imdbID} movie={movie} />
				))}
			</ul>
		</div>
	);
}
export default MovieSearch;
