import { useEffect, useState } from 'react'
import Header from '../components/Header.jsx'
import MovieCard from '../components/MovieCard.jsx'
import './FavoritesPage.css'

const initialFavorites = () => {
  const data = localStorage.getItem('lumina-favorites')
  if (!data) return {}
  try {
    return JSON.parse(data)
  } catch {
    return {}
  }
}

function FavoritesPage() {
  const [favorites, setFavorites] = useState(initialFavorites())

  useEffect(() => {
    localStorage.setItem('lumina-favorites', JSON.stringify(favorites))
  }, [favorites])

  const onToggleFavorite = (movie) => {
    setFavorites((prev) => {
      const next = { ...prev }
      if (next[movie.imdbID]) {
        delete next[movie.imdbID]
      } else {
        next[movie.imdbID] = movie
      }
      return next
    })
  }

  const favList = Object.values(favorites)

  return (
    <>
      <Header />
      <main className="favorites-page">
        <h2>Favorite Movies</h2>
        {favList.length === 0 ? (
          <div className="message">No favorites yet. Add a movie to favorites from the search results.</div>
        ) : (
          <section className="movie-grid">
            {favList.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                isFavorite={true}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </section>
        )}
      </main>
    </>
  )
}

export default FavoritesPage
