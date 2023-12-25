const API_KEY = "4b77cb4358a42bb621afd196dc593d53";

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
};
export default requests;
