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

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies); // update movies
      } catch (err) {
        console.log("Error fetching popular movies:", err);
        setError("Failed to load popular movies...");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    // Handle form submit and prevent page refresh
    e.preventDefault();

    if (!searchQuery.trim()) {
      return;
    }
    if (loading) {
      return;
    }
    // console.log("Searching for:", searchQuery); => for testing purposes
    //API call to fetch movies here
    setLoading(true);

    try {
      // searching movies
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.log("Error fetching movies:", err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      {/* form for searching movies */}
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

      {/* display movie cards in a grid layout */}
      <div className="movies-grid">
        {/* Loop through movies and render one MovieCard for each movie */}
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onSelectMovie={setSelectedMovie} // Pass the function to set the selected movie when a card is clicked
          />
        ))}
      </div>

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
