import axios from 'axios';

const API_KEY = 'ad7a07873cbe21b237d62ea4b1ade30a';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = (category) => {
  return axios.get(`${BASE_URL}/movie/${category}?api_key=${API_KEY}`);
};

export const fetchMovie = (movieId) => {
    return axios.get(`${BASE_URL}/movie/${movieId}?language=es-ES&api_key=${API_KEY}`);
}
