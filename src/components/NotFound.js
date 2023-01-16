import React from "react";
import background from "../resources/pikrepo.jpg";
import "./NotFound.css";

const NotFound = () => {
  const styles = {
    backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 10%, rgba(21,21,20,1) 94%),url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "100vh",
  };

  return (
    <div style={styles}>
      <h1 className='not-found'>Sorry, page not found.</h1>
    </div>
  );
};

export default NotFound;
