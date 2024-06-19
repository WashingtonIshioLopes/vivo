const express = require('express');
const router = express.Router();
const tmdbController = require('../controllers/tmdbController');
const authMiddleware = require('../middleware/auth');

router.get('/popular', authMiddleware, tmdbController.getPopularMovies);
router.get('/top-rated', authMiddleware, tmdbController.getTopRatedMovies);
router.get('/now_playing', authMiddleware, tmdbController.getNowPlayingMovies);
router.get('/upcomming', authMiddleware, tmdbController.getUpCommingMovies);
router.get('/:movieId/details', authMiddleware, tmdbController.getMovieDetails);
router.get('/:movieId/images', authMiddleware, tmdbController.getMovieImages);
router.get('/genres', authMiddleware, tmdbController.getMovieGenres);
router.get('/langs', authMiddleware, tmdbController.getMovieLanguages);
router.get('/search', authMiddleware, tmdbController.getMoviesByFilter);
router.get('/:movieId', authMiddleware, tmdbController.getMovieById);

module.exports = router;