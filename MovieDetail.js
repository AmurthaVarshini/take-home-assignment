import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/movies/${id}`);
      const data = await res.json();
      setMovie(data);
    }
    fetchData();
  }, [id]);

  if (!movie) return <p>Loading movie...</p>;

  const date = new Date(movie.release_date).toLocaleDateString();
  const runtime = movie.runtime + ' minutes';

  return (
    <div style={{ padding: '1rem' }}>
      <h1>{movie.title}</h1>
      <p><em>{movie.tagline}</em></p>
      <p><strong>Release Date:</strong> {date}</p>
      <p><strong>Runtime:</strong> {runtime}</p>
      <p><strong>Overview:</strong> {movie.overview}</p>
      <p><strong>Genres:</strong> {movie.genres}</p>
      <p><strong>Language:</strong> {movie.original_language}</p>
      <p><strong>Votes:</strong> {movie.vote_average}/10</p>
      <Link to="/">← Back to movie list</Link>
    </div>
  );
}

export default MovieDetail;