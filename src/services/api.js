const API_KEY = "0ebbf1df02aa2f1282c70f04e2fc6291";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();
  return data.results;
};

export const fetchGenres = async () => {
  const response = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.genres;
};

export const discoverMovies = async ({ genre, rating }) => {
  let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=vote_count.desc`;
  if (genre) {
    url += `&with_genres=${genre}`;
  }
  if (rating) {
    url += `&vote_average.gte=${rating}`;
  }

  const response = await fetch(url);
  const data = await response.json();
  return data.results;
};
