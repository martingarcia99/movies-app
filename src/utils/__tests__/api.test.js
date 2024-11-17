import axios from "axios";
import { fetchMovies, fetchMovie } from "../api";
import '@testing-library/jest-dom';

jest.mock("axios");

describe("API functions", () => {
  const API_KEY = "ad7a07873cbe21b237d62ea4b1ade30a";
  const BASE_URL = "https://api.themoviedb.org/3";

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchMovies", () => {
    test("fetches movies by category", async () => {
      const category = "popular";
      const mockResponse = {
        data: { results: [{ id: 1, title: "Movie 1" }, { id: 2, title: "Movie 2" }] },
      };

      axios.get.mockResolvedValue(mockResponse);

      const response = await fetchMovies(category);

      expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/movie/${category}?api_key=${API_KEY}`);
      expect(response).toEqual(mockResponse);
    });
  });

  describe("fetchMovie", () => {
    test("fetches a single movie by ID", async () => {
      const movieId = 123;
      const mockResponse = {
        data: { id: 123, title: "Movie 123" },
      };

      axios.get.mockResolvedValue(mockResponse);
      const response = await fetchMovie(movieId);

      expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/movie/${movieId}?language=es-ES&api_key=${API_KEY}`);
      expect(response).toEqual(mockResponse);
    });
  });
});
