// routerRegister.js
const userRoutes = require('./user/userRoutes');
// const calendarRoutes = require('./routes/calendarRoutes');
// const productRoutes = require('./routes/productRoutes');

const registerRoutes = (app, routes) => {
  routes.forEach(route => {
    const middlewares = route.middlewares || [];
    app[route.method](route.path, ...middlewares, route.handler);
  });
};

const routerRegister = (app) => {
  registerRoutes(app, userRoutes);
//   registerRoutes(app, calendarRoutes);
//   registerRoutes(app, productRoutes);
};

module.exports = routerRegister;