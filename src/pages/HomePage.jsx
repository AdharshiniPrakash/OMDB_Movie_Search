import { useEffect, useMemo, useState } from 'react'
import { searchMovies } from '../api/movieService.js'
import Header from '../components/Header.jsx'
import SearchBar from '../components/SearchBar.jsx'
import MovieCard from '../components/MovieCard.jsx'
import Pagination from '../components/Pagination.jsx'
import './HomePage.css'

const TYPE_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'movie', label: 'Movie' },
  { value: 'series', label: 'Series' },
  { value: 'episode', label: 'Episode' },
]

const getFavorites = () => {
  const raw = localStorage.getItem('lumina-favorites')
  if (!raw) return {}
  try {
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

const setFavorites = (favorites) => {
  localStorage.setItem('lumina-favorites', JSON.stringify(favorites))
}

function HomePage() {
  const [searchInput, setSearchInput] = useState('')
  const [query, setQuery] = useState('')
  const [type, setType] = useState('all')
  const [page, setPage] = useState(1)
  const [movies, setMovies] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [favorites, setFavoritesState] = useState(getFavorites())

  // Load default movies on mount
  useEffect(() => {
    setQuery('2024')
  }, [])

  useEffect(() => {
    if (!query.trim()) {
      setMovies([])
      setTotalResults(0)
      setError('')
      return
    }

    const controller = new AbortController()
    const runSearch = async () => {
      setLoading(true)
      setError('')
      try {
        const result = await searchMovies(query.trim(), type, page)
        if (!controller.signal.aborted) {
          setMovies(result.movies)
          setTotalResults(result.totalResults)
        }
      } catch (e) {
        if (!controller.signal.aborted) {
          setMovies([])
          setTotalResults(0)
          setError(e.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    runSearch()

    return () => controller.abort()
  }, [query, type, page])

  const addOrRemoveFavorite = (movie) => {
    setFavoritesState((prev) => {
      const clone = { ...prev }
      if (clone[movie.imdbID]) {
        delete clone[movie.imdbID]
      } else {
        clone[movie.imdbID] = movie
      }
      setFavorites(clone)
      return clone
    })
  }

  const totalPages = useMemo(() => Math.ceil(totalResults / 10), [totalResults])

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = searchInput.trim()
    if (!trimmed) {
      setError('Please type a search query.')
      return
    }
    setQuery(trimmed)
    setPage(1)
  }

  const handleTypeChange = (e) => {
    setType(e.target.value)
    if (query.trim()) {
      setPage(1) // Reset page when type changes, if there's a query
    }
  }

  return (
    <>
      <Header />
      <main className="lumina-page">
        <SearchBar
          query={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onSubmit={handleSubmit}
          type={type}
          typeOptions={TYPE_OPTIONS}
          onTypeChange={handleTypeChange}
          disabled={loading}
        />

        {error && <div className="message error">{error}</div>}
        {loading && <div className="message info">Loading movies...</div>}

        {!loading && !error && movies.length === 0 && query.trim() && (
          <div className="message info">No movies found. Try another query.</div>
        )}

        <section className="movie-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              isFavorite={Boolean(favorites[movie.imdbID])}
              onToggleFavorite={addOrRemoveFavorite}
            />
          ))}
        </section>

        {totalPages > 1 && (
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        )}
      </main>
    </>
  )
}

export default HomePage
