module.exports = [
    {
      method: 'get',
      path: '/ball',
      handler: 'ballController.getBall'
    },
    {
      method: 'post',
      path: '/ball',
      handler: 'ballController.createBall'
    }
  ];