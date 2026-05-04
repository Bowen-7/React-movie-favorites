import "../css/Home.css";
import MovieCard from "../components/MovieCard";
import { useState } from "react";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies] = useState([
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

  return (
    <div className="home">
      {/* form for searching movies */}
      <form className="search-form">
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
