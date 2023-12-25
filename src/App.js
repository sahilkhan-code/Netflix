import logo from "./logo.svg";
// import "./App.css"; 
import Row from "./Components/Row";
import requests from "./requests";
import Banner from "./Components/Banner/Banner";

function App() {
  return (
    <div >
      <Banner />
      <Row title={"Trending"} fetchReq={requests.getTrending} isLargeRow={true} />
      {/* <Row title={"UpComing"} fetchReq={requests.getUpComingMovie} /> */}
      <Row title={"Popular Movies"} fetchReq={requests.getPopularMovie} />
      <Row title={"Popular Tv"} fetchReq={requests.getPopularTv} />
      <Row title={"Top Rated Movie"} fetchReq={requests.getTopRatedMovie} />
      <Row title={"Top Rated Tv"} fetchReq={requests.getTopRatedTv} />
      <Row title={"Action"} fetchReq={requests.getActionMovie} />
      <Row title={"Comedy"} fetchReq={requests.getComedyMovie} />
      <Row title={"Horror"} fetchReq={requests.getHorrorMovie} />
      <Row title={"Romantic"} fetchReq={requests.getRomanticMovie} />
      <Row title={"Scifi"} fetchReq={requests.getScifi} />
    </div>
  );
}

export default App;
