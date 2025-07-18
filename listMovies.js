import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MoviesList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/movies');
      const data = await res.json();
      setMovies(data.slice(0, 20)); // limit to 20
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>🎬 Movie List</h1>
      <div className="grid">
        {movies.map(movie => (
          <Link key={movie.id} to={`/movie/${movie.id}`} className="card">
            <h3>{movie.title}</h3>
            <p>{movie.tagline}</p>
            <strong>{movie.vote_average}/10</strong>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MoviesList;
