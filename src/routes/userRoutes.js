const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const requireAuth = require('../middlewares/auth');

router.post('/create', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/createCalendar', userController.createCalendar);
router.put('/updateCalendar/:id', userController.updateCalendar);
router.put('/updateSchedulesCreated/:id', userController.updateSchedulesCreated);
router.put('/updateSchedulesJoined/:id', userController.updateSchedulesJoined);
router.get('/securityTest', requireAuth, userController.securityTest);
router.get('/listCalendar/:createdBy', userController.listCalendar);
router.get('/calendar/:id', userController.getCalendar);
router.delete('/:id', userController.deleteUser);

module.exports = router;
