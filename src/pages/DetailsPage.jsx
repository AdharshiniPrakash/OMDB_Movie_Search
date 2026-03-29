import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getMovieDetails } from '../api/movieService.js'
import Header from '../components/Header.jsx'
import placeholder from '../assets/placeholder.png'
import './DetailsPage.css'

export default function DetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [bgImage, setBgImage] = useState(placeholder)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadDetails = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await getMovieDetails(id)
        setMovie(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }

    loadDetails()
  }, [id])

  useEffect(() => {
    if (!movie) return

    const posterURL = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : null
    if (!posterURL) {
      setBgImage(placeholder)
      return
    }

    let cancelled = false
    const tmpImg = new Image()
    tmpImg.onload = () => {
      if (!cancelled) setBgImage(posterURL)
    }
    tmpImg.onerror = () => {
      if (!cancelled) setBgImage(placeholder)
    }
    tmpImg.src = posterURL

    return () => {
      cancelled = true
    }
  }, [movie])

  if (loading) {
    return (
      <>
        <Header />
        <main className="details-page">Loading movie details...</main>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Header />
        <main className="details-page error">{error}</main>
      </>
    )
  }

  if (!movie) {
    return null
  }

  return (
    <>
      <Header />
      <div className="details-hero" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="details-overlay"></div>
        <div className="details-content">
          <img
            src={movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : placeholder}
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = placeholder }}
            alt={`${movie.Title} poster`}
            className="details-poster"
          />
          <div className="details-meta">
            <h1>{movie.Title}</h1>
            <p className="subtitle">{movie.Year} · {movie.Type} · {movie.Runtime}</p>
            <p className="rating">IMDb {movie.imdbRating} / {movie.imdbVotes}</p>
            <p className="plot">{movie.Plot}</p>
            <dl>
              <div>
                <dt>Genre</dt>
                <dd>{movie.Genre}</dd>
              </div>
              <div>
                <dt>Director</dt>
                <dd>{movie.Director}</dd>
              </div>
              <div>
                <dt>Actors</dt>
                <dd>{movie.Actors}</dd>
              </div>
              <div>
                <dt>Language</dt>
                <dd>{movie.Language}</dd>
              </div>
              <div>
                <dt>Awards</dt>
                <dd>{movie.Awards}</dd>
              </div>
            </dl>
            <button onClick={() => navigate(-1)} className="back-button">Back</button>
          </div>
        </div>
      </div>
    </>
  )
}
