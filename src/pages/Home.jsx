import "../css/Home.css";
import MovieCard from "../components/MovieCard";
import { useState } from "react";
import { searchMovies } from "../services/api";

function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Test Movie",
      release_date: "2024-01-01",
      poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    },
    {
      id: 2,
      title: "Another Movie",
      release_date: "2023-05-10",
      poster_path: "/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg",
    },
  ]);

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
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;
