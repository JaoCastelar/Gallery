import React, { createContext, useContext, useReducer, useState } from 'react';

const AlbumContext = createContext();

export const useAlbums = () => {
  return useContext(AlbumContext);
};

const initialState = {
  albums: [],
};

const albumReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ALBUM':
      return { albums: [...state.albums, action.payload] };
    default:
      return state;
  }
};

const albumExist = () => {
    alert("Album já existente.")
}


export const AlbumProvider = ({ children }) => {
  const [state, dispatch] = useReducer(albumReducer, initialState);
  const [error, setError] = useState(null);

  const addAlbum = (album) => {
    if (state.albums.includes(album)) {
        setError("Album já existente");
        return
    }
    setError(null)
    dispatch({ type: 'ADD_ALBUM', payload: album });
  };

  return (
    <AlbumContext.Provider value={{ albums: state.albums, addAlbum, error, setError }}>
      {children}
    </AlbumContext.Provider>
  );
};
