const express = require('express');
const router = express.Router();
const filmeController = require('../controllers/filmeController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, filmeController.createFilme);
router.get('/:id', authMiddleware, filmeController.getFilmeById);
router.get('/', authMiddleware, filmeController.getAllFilmes);
router.get('/:idFilme/usuario/:idUsuario', authMiddleware, filmeController.getFilmeByIdAndUserId);
router.get('/usuario/:idUsuario', authMiddleware, filmeController.getFilmeByUserId);
router.put('/:id', authMiddleware, filmeController.updateFilme);
router.delete('/:id', authMiddleware, filmeController.deleteFilme);

module.exports = router;
