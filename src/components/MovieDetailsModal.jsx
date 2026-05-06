import "../css/MovieDetailsModal.css";

function MovieDetailsModal({ movie, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="movie-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="modal-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>

        <div className="modal-info">
          <h2>{movie.title}</h2>
          <p className="modal-meta">
            {movie.release_date?.split("-")[0]} · ★{" "}
            {movie.vote_average?.toFixed(1)}
          </p>
          <p className="modal-overview">
            {movie.overview || "No overview available."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsModal;
