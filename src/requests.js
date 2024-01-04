export const API_KEY = "4b77cb4358a42bb621afd196dc593d53";
export const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Yjc3Y2I0MzU4YTQyYmI2MjFhZmQxOTZkYzU5M2Q1MyIsInN1YiI6IjY1ODI3ZjdmY2E4MzU0NDI0NGQ2Y2ZmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n_iN9LZpiQw5vtcdHDzCBqEbJNIOk5yskW_5y8vkAqM";

const requests = {
  getTrending: `/trending/all/day?language=en-US&api_key=${API_KEY}`,
  getUpComingMovie: `/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}&api_key=${API_KEY}`,
  getTopRatedTv: `/discover/tv?include_adult=false&language=en-US&page=1&sort_by=vote_average.desc&vote_count.gte=200&api_key=${API_KEY}`,
  getPopularTv: `/discover/tv?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${API_KEY}`,
  getPopularMovie: `/movie/popular?language=en-US&page=1&api_key=${API_KEY}`,
  getTopRatedMovie: `/movie/top_rated?language=en-US&page=1&api_key=${API_KEY}`,
  getActionMovie: `/discover/movie?with_genres=28&api_key=${API_KEY}`,
  getComedyMovie: `/discover/movie?with_genres=35&api_key=${API_KEY}`,
  getHorrorMovie: `/discover/movie?with_genres=27&api_key=${API_KEY}`,
  getRomanticMovie: `/discover/movie?with_genres=10749&api_key=${API_KEY}`,
  getScifi: `/discover/movie?with_genres=878&api_key=${API_KEY}`,
  getFavMovies:`https://api.themoviedb.org/3/account/20845727/favorite/movies`,
  addFavMovies:`https://api.themoviedb.org/3/account/20845727/favorite`,
  watchlist:`https://api.themoviedb.org/3/account/20845727/watchlist`,
  getWatchList:`https://api.themoviedb.org/3/account/20845727/watchlist/movies`
};
export default requests;
