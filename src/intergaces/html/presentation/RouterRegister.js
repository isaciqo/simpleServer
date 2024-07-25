const userRoutes = require('./user/UserRoutes');
const calendarRoutes = require('./calendar/CalendarRoutes');

const registerRoutes = (app, routes, container) => {
    routes.forEach(route => {
        const [controllerName, methodName] = route.handler.split('.');
        const controller = container.resolve(controllerName);
        
        app[route.method](route.path, (req, res) => {
          controller[methodName](req, res);
        });
      });
};

const routerRegister = (app, container) => {
  registerRoutes(app, userRoutes, container);
  registerRoutes(app, calendarRoutes, container);
};

module.exports = routerRegister;