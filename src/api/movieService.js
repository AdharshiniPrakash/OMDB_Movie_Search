import axios from 'axios'

const API_URL = import.meta.env.VITE_OMDB_API_URL || 'http://www.omdbapi.com/'
const API_KEY = import.meta.env.VITE_OMDB_API_KEY || ''

if (!API_KEY) {
  console.warn('VITE_OMDB_API_KEY is not set. Add it to .env in project root.')
}

export async function searchMovies(query, type = 'all', page = 1) {
  try {
    const params = {
      apikey: API_KEY,
      s: query,
      page,
    }

    if (type && type !== 'all') {
      params.type = type
    }

    const response = await axios.get(API_URL, { params })
    if (response.data.Response === 'False') {
      throw new Error(response.data.Error || 'No results')
    }

    const movies = response.data.Search || []
    // Filter out duplicates based on imdbID
    const uniqueMovies = movies.filter((movie, index, self) =>
      index === self.findIndex(m => m.imdbID === movie.imdbID)
    )

    return {
      movies: uniqueMovies,
      totalResults: Number(response.data.totalResults || 0),
    }
  } catch (error) {
    throw new Error(error?.response?.data?.Error || error.message || 'Search failed')
  }
}

export async function getMovieDetails(id) {
  try {
    const response = await axios.get(API_URL, {
      params: {
        apikey: API_KEY,
        i: id,
        plot: 'full',
      },
    })

    if (response.data.Response === 'False') {
      throw new Error(response.data.Error || 'Movie not found')
    }

    return response.data
  } catch (error) {
    throw new Error(error?.response?.data?.Error || error.message || 'Details fetch failed')
  }
}
