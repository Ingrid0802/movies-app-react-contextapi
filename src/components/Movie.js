import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Movie.css";
import "./MovieCard.css";
import no_picture from "../resources/No_picture_available.png";
import axios from "axios";
import MovieCard from "./MovieCard";

const API_IMG = "https://image.tmdb.org/t/p/w500/";

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [error, setError] = useState({ show: false, msg: "" });
  const [genres, setGenres] = useState([]);
  const [production, setProduction] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const styles = {
    backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 10%, rgba(21,21,20,1) 89%),url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "70vh",
  };

  const getMovie = async (url) => {
    try {
      const response = await axios.get(url);
      setMovie(response.data);
      setGenres(response.data.genres);
      setProduction(response.data.production_companies);
      setIsLoading(false);
    } catch (error) {
      setError({ show: true, msg: error.message });
    }
  };

  useEffect(() => {
    getMovie(
      `https://api.themoviedb.org/3/movie/${id}?api_key=dde0f2e949e441f0d34072bd3474a470`
    );
  }, [id]);

  const getSimilarMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=dde0f2e949e441f0d34072bd3474a470&language=en-US&page=1`
      );

      setSimilarMovies(response.data.results);
    } catch (error) {
      setError({ show: true, msg: error.message });
    }
  };

  useEffect(() => {
    getSimilarMovies();
  }, [id]);

  if (error.show) {
    return (
      <div className='page-error'>
        <h1>{error.msg}</h1>
        <Link to='/'>
          <button className='btn-back'>back</button>
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='loading-container'>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className='movie-cont'>
      <div className='background-img' style={styles}></div>
      <div className='single-movie-cont'>
        <section className='single-movie'>
          <div className='img-container'>
            <img
              src={
                movie.poster_path
                  ? `${API_IMG}${movie.poster_path}`
                  : no_picture
              }
              alt={movie.title}
              className='details-img'
            />
          </div>
          <div className='movie-details'>
            <h2>{`${movie.title} (${movie.release_date})`}</h2>
            <h3></h3>
            <div className='genres-container'>
              {genres.map((genre) => (
                <div className='genre' key={genre.id}>
                  {genre.name}
                </div>
              ))}
            </div>
            <div>
              {production.map((production) => (
                <span className='production' key={production.id}>
                  {production.name}
                </span>
              ))}
            </div>

            <p>{movie.overview}</p>
            {movie.runtime > 0 ? <p>Runtime: {movie.runtime} minutes</p> : ""}

            <p>Rating: {parseInt(movie.vote_average, 10).toFixed(2)}</p>
            <Link className='btn-back' to='/'>
              Back
            </Link>
          </div>
        </section>
        <section className='similar-movies-section'>
          <h1 className='similar-movies-title'>Similar Movies</h1>
          <div className='similar-movies movie-list '>
            {similarMovies.slice(0, 6).map((element) => {
              return <MovieCard {...element} key={element.id}></MovieCard>;
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Movie;
