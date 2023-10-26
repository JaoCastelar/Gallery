import React, { createContext, useContext, useReducer } from 'react';

const FotoContext = createContext();

export const useFotos = () => {
  return useContext(FotoContext);
};

const initialState = {
  fotos: {},
};

const photoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FOTO':
      const { album, foto } = action.payload;
      return {
        fotos: {
          ...state.fotos,
          [album]: [...(state.fotos[album] || []), foto],
        },
      };
    default:
      return state;
  }
};

export const FotoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(photoReducer, initialState);

  const addFoto = (album, foto) => {
    dispatch({ type: 'ADD_FOTO', payload: { album, foto } });
  };

  return (
    <FotoContext.Provider value={{ fotos: state.fotos, addFoto }}>
      {children}
    </FotoContext.Provider>
  );
};
