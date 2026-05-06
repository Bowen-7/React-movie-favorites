import "../css/Home.css";
import MovieCard from "../components/MovieCard";
import MovieDetailsModal from "../components/MovieDetailsModal";
import { useState, useEffect } from "react";
import { getPopularMovies, searchMovies } from "../services/api";

function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const loadPopularMovies = async () => {
    setLoading(true);
    try {
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies || []);
      setError(null);
      setHasSearched(false);
    } catch (err) {
      console.log("Error fetching popular movies:", err);
      setError("Failed to load popular movies...");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      return;
    }
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults || []);
      setHasSearched(true);
      setError(null);
    } catch (err) {
      console.log("Error fetching movies:", err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          className="search-input"
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}
      
      {/* Show loading, empty state, or movies grid based on the current state */}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : hasSearched && movies.length === 0 ? (
        <div className="empty-results">
          <h2>No movies found</h2>
          <p>Try a different title or return to popular movies.</p>
          <button type="button" onClick={loadPopularMovies}>
            Show popular movies
          </button>
        </div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onSelectMovie={setSelectedMovie}
            />
          ))}
        </div>
      )}

      {selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default Home;
