const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const requireAuth = require('../middlewares/auth');

router.post('/create', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/securityTest', requireAuth, userController.securityTest);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
