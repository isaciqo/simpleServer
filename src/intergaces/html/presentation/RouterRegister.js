const userRoutes = require('./user/userRoutes');

const registerRoutes = (app, routes) => {
  routes.forEach(route => {
    const middlewares = route.middlewares || [];
    app[route.method](route.path, ...middlewares, route.handler);
  });
};

const routerRegister = (app) => {
  registerRoutes(app, userRoutes);
};

module.exports = routerRegister;