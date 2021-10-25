const baseURL = 'https://api.themoviedb.org/3';
const key = '9603d2e167d8c289be8d59d4b5fd1886';

export const getMovies = async (term: string, language: string) => {
    try {
      const response = await fetch(
        `${baseURL}/search/movie?api_key=${key}&query=${term}&language=${language}`
      );
      return response.json();
    } catch (err) {
      console.error(err);
    }
  };
  
  export const getMovie = async (id: string, language: string) => {
    try {
      const response = await fetch(`${baseURL}/movie/${id}?api_key=${key}&language=${language}`);
      return response.json();
    } catch (err) {
      console.error(err);
    }
  };

  export const getSimilarMovies = async (id: string, language: string) => {
    try {
      const response = await fetch(`${baseURL}/movie/${id}/recommendations?api_key=${key}&language=${language}`);
      return response.json();
    } catch (err) {
      console.error(err);
    }
  };

  export const getPopularMovies = async (language: string) => {
    try {
      const response = await fetch(`${baseURL}/movie/popular?api_key=${key}&language=${language}`);
      return response.json();
    } catch (err) {
      console.error(err);
    }
  };
  export const getLatestMovies = async (language: string) => {
    try {
      const response = await fetch(`${baseURL}/movie/now_playing?api_key=${key}&language=${language}`);
      return response.json();
    } catch (err) {
      console.error(err);
    }
  };
  export const getTopRatedMovies = async (language: string) => {
    try {
      const response = await fetch(`${baseURL}/movie/top_rated?api_key=${key}&language=${language}`);
      return response.json();
    } catch (err) {
      console.error(err);
    }
  };
  
  export const POSTER_URL = "https://image.tmdb.org/t/p/w500";
  export const BACKDROP_URL = "https://image.tmdb.org/t/p/original";
