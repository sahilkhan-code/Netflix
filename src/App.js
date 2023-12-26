import "./App.css"; 
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Home from "./Components/Home";
import Movie from "./Components/Movie/Movie";
import Search from "./Components/Search/Search";

function App() {
  return (
    <div className="app" >
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/search" element={<Search/>} />
          <Route path="/movie" element={<Movie/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
