import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=b4550413`;

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [moviesGenres, setMoviesGenres] = useState([]);
  const [error, setError] = useState({ show: false, msg: "" });

  const getMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?api_key=dde0f2e949e441f0d34072bd3474a470&language=en-US&page=1"
      );
      setMovies(response.data.results);
    } catch (error) {
      setError({ show: true, msg: error.message });
    }
  };

  useEffect(() => {
    getMovies();
  }, [query.length === 0]);

  const searchMovies = async () => {
    if (query.length > 0) {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=dde0f2e949e441f0d34072bd3474a470&language=en-US&query=${query}&page=1&include_adult=false`
        );
        setMovies(response.data.results);
      } catch (error) {
        setError({ show: true, msg: error.message });
      }
    } else return;
  };

  useEffect(() => {
    searchMovies();
  }, [query]);

  const getGenres = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=dde0f2e949e441f0d34072bd3474a470&language=en-US"
      );
      setMoviesGenres(response.data.genres);
    } catch (error) {
      setError({ show: true, msg: error.message });
    }
  };

  useEffect(() => {
    getGenres();
  }, []);

  return (
    <AppContext.Provider
      value={{ movies, setMovies, query, setQuery, error, moviesGenres }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
