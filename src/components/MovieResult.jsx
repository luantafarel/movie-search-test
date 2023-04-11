import React from "react";
function MovieResult({ movie }) {
	return (
		<div>
			<li>
				<h2>Movie Name {movie.Title}</h2>
				<h2>Movie Year {movie.Year}</h2>
				<h2>Movie Type {movie.Type}</h2>
				<img alt={movie.Title} src={movie.Poster} />
			</li>
		</div>
	);
}

export default MovieResult;
