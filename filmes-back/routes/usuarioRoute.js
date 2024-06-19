const express = require('express');
const router = express.Router();
const userController = require('../controllers/usuarioController');
const authMiddleware = require('../middleware/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/login2', userController.login2);
router.get('/whoami', authMiddleware, userController.getUser);
router.put('/:id', authMiddleware, userController.updateUser);
router.delete('/:id', authMiddleware, userController.deleteUser);

module.exports = router;

