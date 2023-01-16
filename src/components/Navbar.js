import React from "react";
import "./Navbar.css";
import { BsSun } from "react-icons/bs";
import { useGlobalContext } from "../context";
import movie from "../resources/movi-buncopy.png";
import popcorn from "../resources/pngwing.com.png";

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={movie} alt='' className='movie-logo' />
      <img src={popcorn} alt='' className='movie-pop' />
    </div>
  );
};

export default Navbar;
