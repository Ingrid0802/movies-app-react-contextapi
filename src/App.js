import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MoviePage from "./pages/MoviePage";
import { useGlobalContext } from "./context";
import UnavailablePage from "./pages/UnavailablePage";

function App() {
  //const { theme } = useGlobalContext();
  return (
    //id={theme}
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movies/:id' element={<MoviePage />}></Route>
          <Route path='*' element={<UnavailablePage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
