const { header } = require('express-validator');

const userSchema  = require('./userSchemas')();

module.exports = [
    {
      method: 'post',
      path: '/create',
      handler: 'userController.createUser',
      validation: {
        body: userSchema.create
      }
    },
    {
      method: 'get',
      path: '/confirm/:token',
      handler: 'userController.confirmEmail'
    },
    {
      method: 'post',
      path: '/requestReset/:email',
      handler: 'userController.requestReset'
    },
    {
      method: 'post',
      path: '/confirmReset/:token',
      handler: 'userController.confirmReset'
    },
    {
      method: 'post',
      path: '/login',
      handler: 'userController.loginUser',
      validation: {
        body: userSchema.login
      }
    },
    {
      method: 'get',
      path: '/user/:user_id',
      handler: 'userController.getUser',
      validation: {
        params: userSchema.getUser
      }
    }
];