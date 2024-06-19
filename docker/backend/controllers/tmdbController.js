//const axios = require('axios');
const axios = require('../middleware/axios');

const API_KEY = 'd8c85786e301a590aa0c9efacbe8c846'; // Substitua pela sua API key do The Movie DB

const getPopularMovies = async (req, res) => {
  try {
    //https://api.themoviedb.org/3/movie/now_playing?api_key=d8c85786e301a590aa0c9efacbe8c846
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
    res.status(200).json(response.data.results);
  } catch (error) {
    console.log(error);
    console.error('Error fetching popular movies:', error);
    res.status(500).send('Error fetching popular movies');
  }
};

const getTopRatedMovies = async (req, res) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`);
    res.status(200).json(response.data.results);
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    res.status(500).send('Error fetching top rated movies');
  }
};

const getNowPlayingMovies = async (req, res) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`);
      res.status(200).json(response.data.results);
    } catch (error) {
      console.error('Error fetching now playing movies:', error);
      res.status(500).send('Error fetching now playing movies');
    }
  };

  const getUpCommingMovies = async (req, res) => {
    try {      
      const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`);
      res.status(200).json(response.data.results);
    } catch (error) {
      console.error('Error fetching up comming movies:', error);
      res.status(500).send('Error fetching up comming movies');
    }
  };  

const getMovieDetails = async (req, res) => {
    const movieId = req.params.movieId;
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
      res.status(500).send('Error fetching movie details');
    }
  };
  
  const getMovieImages = async (req, res) => {
    const movieId = req.params.movieId;
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${API_KEY}`);
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error fetching movie images:', error);
      res.status(500).send('Error fetching movie images');
    }
  };

  const getMovieGenres = async (req, res) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`);
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error fetching movie genres:', error);
      res.status(500).send('Error fetching movie genres');
    }
  };

  const getMovieLanguages = async (req, res) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/configuration/languages?api_key=${API_KEY}`);
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error fetching movie langs:', error);
      res.status(500).send('Error fetching movie langs');
    }
  };
  
  const getMoviesByFilter = async (req, res) => {
    const { adult, original_language, original_title, title, release_date } = req.query;
    const query = {};
  
    if (adult) query.include_adult = adult;
    if (original_language) query.with_original_language = original_language;
    if (original_title) query.query = original_title;
    if (title) query.query = title;
    if (release_date) query.primary_release_year = release_date;
  
    const queryString = new URLSearchParams(query).toString();
    
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&${queryString}`);
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error fetching movies by filter:', error);
      res.status(500).send('Error fetching movies by filter');
    }
  };

  const getMovieById = async (req, res) => {
    //const { id } = req.query;
    const movieId = req.params.movieId;
    console.log(movieId);

    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error fetching movies by IDs:', error);
      res.status(500).send('Error fetching movies by IDs');
    }
  };


module.exports = {
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  getUpCommingMovies,
  getMovieDetails,
  getMovieImages,
  getMovieGenres,
  getMovieLanguages,
  getMoviesByFilter,
  getMovieById
};
