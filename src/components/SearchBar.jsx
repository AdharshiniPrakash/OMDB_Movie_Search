import './SearchBar.css'

export default function SearchBar({ query, onChange, onSubmit, type, typeOptions, onTypeChange, disabled }) {
  return (
    <form className="lumina-search-form" onSubmit={onSubmit}>
      <div className="search-field">
        <input
          value={query}
          onChange={onChange}
          type="text"
          placeholder="Search movies, series, episodes..."
          className="search-input"
          aria-label="Search movies"
          disabled={disabled}
        />
      </div>

      <div className="type-select">
        <select value={type} onChange={onTypeChange} aria-label="Filter by type">
          {typeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="search-button" disabled={disabled}>
        Search
      </button>
    </form>
  )
}
