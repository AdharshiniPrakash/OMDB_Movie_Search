A React + Vite movie discovery app styled with a premium dark theme (Lumina) and integrated with the OMDB API.

## Features

- Search movies/series/episodes by title
- Filter by type: All, Movie, Series, Episode
- Pagination with OMDB pages
- Movie detail page with immersive hero background
- Favorites (add/remove) persisted in localStorage
- Branded placeholder for missing/broken posters
- Responsive layout (desktop/tablet/mobile)
- WCAG-focused accessibility (keyboard focus, contrast, semantics)

## Theme

- Background: `#121212` (Midnight)
- Card surface: `#1E1E1E` (Jet)
- Accent: `#FFD700` (Electric Gold)
- Primary text: `#F5F5F5` (Off-White)
- Secondary text: `#A0A0A0` (Steel Gray)
- Error: `#E50914` (Cinema Red)

## Setup

1. Install dependencies
   ```bash
   npm install
   ```

2. Add OMDB API key to `.env`
   ```text
   VITE_OMDB_API_KEY=YOUR_API_KEY_HERE
   VITE_OMDB_API_URL=http://www.omdbapi.com/
   ```

3. Run dev server
   ```bash
   npm run dev
   ```

## Available scripts

- `npm run dev` — start development server
- `npm run build` — production build
- `npm run lint` — ESLint check

## Structure

- `src/App.jsx` — router and page wiring
- `src/api/movieService.js` — OMDB API service wrapper
- `src/pages/HomePage.jsx` — search grid + controls + pagination
- `src/pages/DetailsPage.jsx` — movie detail immersive layout
- `src/pages/FavoritesPage.jsx` — favorites page with localStorage
- `src/components` — header, search bar, movie card, pagination components
- `src/assets` — logo, favicon, placeholder imagery

## Behavior

- default query on page load: `2024`
- search triggered by button or Enter key only
- type filter triggers API query (no local array filter)
- duplicate results are removed by `imdbID`
- placeholder used when poster URL is missing/broken

## Accessibility + responsiveness

- keyboard focus visible on interactive elements
- minimum tap targets for mobile (44x44)
- responsive grid and form for <=768px
- high contrast color scheme for readability

## Notes

- Ensure API key is valid and not rate-limited.
- Use full movie title to avoid "Too many results" from OMDB.
- Favorites stored under `lumina-favorites` in localStorage.