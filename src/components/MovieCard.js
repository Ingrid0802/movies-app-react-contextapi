import React from "react";
import "./MovieCard.css";
import { Link } from "react-router-dom";
import no_picture from "../resources/No_picture_available.png";

const API_IMG = "https://image.tmdb.org/t/p/w500/";
const MovieCard = ({ poster_path, title, name, id }) => {
  return (
    <div className='movie-card'>
      <Link to={`/movies/${id}`} className='link'>
        <img
          className='img'
          src={!poster_path ? no_picture : `${API_IMG}${poster_path}`}
          alt={title}
        />
      </Link>
      <Link to={`/movies/${id}`} className='link'>
        <h4>{title || name}</h4>
      </Link>
    </div>
  );
};

export default MovieCard;
