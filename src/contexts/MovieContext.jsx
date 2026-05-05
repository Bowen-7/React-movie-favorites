import { createContext, useContext, useState, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext); // Custom hook to use the MovieContext

export const MovieProvider = ({ children }) => {
  // State to hold the list of movies
  const [favorites, setFavorites] = useState(() => {
    // Initialize favorites from localStorage if available
    const storedFavs = localStorage.getItem("favorites");
    return storedFavs ? JSON.parse(storedFavs) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie) => {
    setFavorites((prevFavs) => [...prevFavs, movie]);
  };

  const removeFromFavorites = (movieID) => {
    setFavorites((prevFavs) =>
      prevFavs.filter((movie) => movie.id !== movieID),
    );
  };

  const isFavorite = (movieID) => {
    return favorites.some((movie) => movie.id === movieID);
  };

  const value = {
    // Expose the favorites and functions
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
