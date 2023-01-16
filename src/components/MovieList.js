import { useGlobalContext } from "../context";
import MovieCard from "./MovieCard";
import "./MovieList.css";

const MovieList = () => {
  const { movies } = useGlobalContext();

  return (
    <>
      <div className='movie-list'>
        {movies.map((movie) => {
          return <MovieCard {...movie} key={movie.id}></MovieCard>;
        })}
      </div>
    </>
  );
};

export default MovieList;
