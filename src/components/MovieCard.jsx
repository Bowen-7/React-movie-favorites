import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({ movie, onSelectMovie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  function onFavoriteClick(e) {
    e.preventDefault(); // Prevents the default button behavior
    e.stopPropagation(); // Prevents the click from bubbling up to the card's onClick

    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  }

  return (
    <div
      className="movie-card"
      onClick={onSelectMovie ? () => onSelectMovie(movie) : undefined}
    >
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={onFavoriteClick}
          >
            ♥
          </button>
        </div>
      </div>

      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.split("-")[0]}</p>
      </div>
    </div>
  );
}

export default MovieCard;
