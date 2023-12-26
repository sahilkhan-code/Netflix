
import Row from "./Row";
import requests from "../requests";
import Banner from "./Banner/Banner";
import Navbar from "./Navbar/Navbar";
import "./Home.css"

function Home() {
  return (
    <div className="home" >
      <Navbar />
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
      <Row title={"Scifi"} fetchReq={requests.getScifi} />
    </div>
  );
}

export default Home;
