import { Link } from 'react-router-dom'
import { useState } from 'react'
import placeholder from '../assets/placeholder.png'
import './MovieCard.css'

export default function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  const [imageUrl, setImageUrl] = useState(movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : placeholder)

  return (
    <article className="movie-card">
      <Link to={`/movie/${movie.imdbID}`} className="movie-poster-link" aria-label={`Open details for ${movie.Title}`}>
        <img
          src={imageUrl}
          onError={() => setImageUrl(placeholder)}
          alt={`${movie.Title} poster`}
          className="movie-poster"
        />
      </Link>
      <button
        type="button"
        className={`favorite-toggle ${isFavorite ? 'active' : ''}`}
        onClick={() => onToggleFavorite(movie)}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        ★
      </button>
      <div className="movie-meta">
        <h3>{movie.Title}</h3>
        <p>{movie.Year} · {movie.Type}</p>
      </div>
    </article>
  )
}
