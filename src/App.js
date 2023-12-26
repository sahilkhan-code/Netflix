import logo from "./logo.svg";
import "./App.css"; 
import Row from "./Components/Row";
import requests from "./requests";
import Banner from "./Components/Banner/Banner";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Home from "./Components/Home";
import Movie from "./Components/Movie/Movie";

function App() {
  return (
    <div className="app" >
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          {/* <Route path="/search" element={<Search/>} /> */}
          <Route path="/movie" element={<Movie/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
