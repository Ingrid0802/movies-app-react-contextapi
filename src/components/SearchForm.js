import React from "react";
import "./SearchForm.css";
import { useGlobalContext } from "../context";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
const SearchForm = () => {
  const { query, setQuery, error, moviesGenres, setMovies, setError } =
    useGlobalContext();
  const [isClicked, setIsClicked] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState({});
  const [buttonGenre, setButtonGenre] = useState("Genre");

  const submitHandler = (event) => {
    event.preventDefault();
  };
  const changeHandler = (event) => {
    setQuery(event.target.value);
  };

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const handleSelectedGenre = (genre) => {
    setSelectedGenre(genre);
    setButtonGenre(genre.name);
  };

  const searchGenres = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=dde0f2e949e441f0d34072bd3474a470&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${selectedGenre.id}&with_watch_monetization_types=flatrate`
      );
      setMovies(response.data.results);
    } catch (error) {
      setError({ show: true, msg: error.message });
      console.log(error);
    }
  };

  useEffect(() => {
    searchGenres();
  }, [selectedGenre]);

  return (
    <>
      <section className='form'>
        <div>
          <button className='dropdown-button' onClick={handleClick}>
            {buttonGenre}
            <RiArrowDropDownLine className='dropdown-icon' />
          </button>
          <ul className='dropdown'>
            {moviesGenres.map((genre) => (
              <li
                className={!isClicked ? "options" : ""}
                onClick={() => handleSelectedGenre(genre)}
                key={genre.id}
                value={`${genre.id}`}
              >
                {genre.name}
              </li>
            ))}
          </ul>
        </div>
        <div className='form-div'>
          <form onSubmit={submitHandler}>
            <input
              type='text'
              placeholder='Movie Search'
              className='search'
              value={query}
              onChange={changeHandler}
            />
            {error.show && <div className='error'>{error.msg}</div>}
          </form>
        </div>
      </section>
    </>
  );
};

export default SearchForm;
