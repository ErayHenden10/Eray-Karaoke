import React, { createContext, useContext, useState } from 'react';

const FavoriContext = createContext();

export const FavoriProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (songId) => {
    setFavorites((prevFavorites) => [...prevFavorites, songId]);
  };

  const removeFavorite = (songId) => {
    setFavorites((prevFavorites) => prevFavorites.filter((id) => id !== songId));
  };

  return (
    <FavoriContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoriContext.Provider>
  );
};

export const useFavori = () => {
  return useContext(FavoriContext);
};
