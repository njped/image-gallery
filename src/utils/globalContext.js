import React, { Component, createContext, useContext } from 'react';

// GlobalContext creates the context
const GlobalContext = createContext();

// useGlobalContext is a custom hook that reads the context from GlobalContext
export const useGlobalContext = () => useContext(GlobalContext);

/**
 * 
 * @prop {react-proop} children - is all the child components wrapped together within the context provider
 * @var {array} favoritedImages - variable that stores data of favorite images
 * @returns {Component} GlobalContext.Provider - allows any child components access the data in the value prop
 */
export const GlobalProvider = ({children}) => {
  const favoritedImages = [];
  return (
    <GlobalContext.Provider value={{ favoritedImages }}>
      {children}
    </GlobalContext.Provider>
  );
};