// routes/userRoutes.js
const authMiddleware = require('../../middlewares/auth.js');
const {
  createUser,
  loginUser,
  createCalendar,
  updateCalendar,
  updateSchedulesCreated,
  updateSchedulesJoined,
  securityTest,
  listCalendar,
  getCalendar,
  deleteUser
} = require('./userController');

const userRoutes = [
  {
    method: 'post',
    path: '/create',
    handler: createUser
  },
  {
    method: 'post',
    path: '/login',
    handler: loginUser
  },
  {
    method: 'post',
    path: '/createCalendar',
    middlewares: [authMiddleware],
    handler: createCalendar
  },
  {
    method: 'put',
    path: '/updateCalendar/:id',
    middlewares: [authMiddleware],
    handler: updateCalendar
  },
  {
    method: 'put',
    path: '/updateSchedulesCreated/:id',
    middlewares: [authMiddleware],
    handler: updateSchedulesCreated
  },
  {
    method: 'put',
    path: '/updateSchedulesJoined/:id',
    middlewares: [authMiddleware],
    handler: updateSchedulesJoined
  },
  {
    method: 'get',
    path: '/securityTest',
    middlewares: [authMiddleware],
    handler: securityTest
  },
  {
    method: 'get',
    path: '/listCalendar/:createdBy',
    middlewares: [authMiddleware],
    handler: listCalendar
  },
  {
    method: 'get',
    path: '/calendar/:id',
    middlewares: [authMiddleware],
    handler: getCalendar
  },
  {
    method: 'delete',
    path: '/:id',
    middlewares: [authMiddleware],
    handler: deleteUser
  }
];

module.exports = userRoutes;
// const express = require('express');
// const router = express.Router();
// const userController = require('../../../../controllers/userController');
// const requireAuth = require('../../middlewares/auth');

// router.post('/create', userController.createUser);
// router.post('/login', userController.loginUser);
// router.post('/createCalendar', userController.createCalendar);
// router.put('/updateCalendar/:id', userController.updateCalendar);
// router.put('/updateSchedulesCreated/:id', userController.updateSchedulesCreated);
// router.put('/updateSchedulesJoined/:id', userController.updateSchedulesJoined);
// router.get('/securityTest', requireAuth, userController.securityTest);
// router.get('/listCalendar/:createdBy', userController.listCalendar);
// router.get('/calendar/:id', userController.getCalendar);
// router.delete('/:id', userController.deleteUser);

// module.exports = router;

