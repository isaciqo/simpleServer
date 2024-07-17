module.exports = [
    {
      method: 'post',
      path: '/create',
      handler: 'realUserController.createUser'
    },
    {
      method: 'get',
      path: '/confirm/:token',
      handler: 'realUserController.confirmEmail'
    },
    {
      method: 'post',
      path: '/requestReset/:email',
      handler: 'realUserController.requestReset'
    },
    {
      method: 'post',
      path: '/confirmReset/:token',
      handler: 'realUserController.confirmReset'
    },
    {
      method: 'post',
      path: '/login',
      handler: 'realUserController.loginUser'
    }
];