import React from "react";
import SearchForm from "../components/SearchForm";
import MovieList from "../components/MovieList";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <SearchForm />
      <MovieList />
    </div>
  );
};

export default Home;
