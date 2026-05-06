import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import { useState } from "react";
import MovieDetailsModal from "../components/MovieDetailsModal";

function Favorites() {
  const { favorites } = useMovieContext();
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (favorites.length > 0) {
    return (
      <div className="favorites">
        <h2>Your Favorites</h2>
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard
              movie={movie}
              key={movie.id}
              onSelectMovie={setSelectedMovie}
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

  return (
    <div className="favorites-empty">
      <h2>No Favorite Movies Yet</h2>
      <p>Start adding movies to your favorites and they will appear here!</p>
    </div>
  );
}

export default Favorites;
