const realUserRoutes = require('./user/realUserRoutes');
const calendarRoutes = require('./calendar/CalendarRoutes');

const registerRoutes = (app, routes, container) => {
    routes.forEach(route => {
        const [controllerName, methodName] = route.handler.split('.');
        const controller = container.resolve(controllerName);
        
        app[route.method](route.path, (req, res) => {
          controller[methodName](req, res);
        });
    
        console.log(`Registered route: ${route.method.toUpperCase()} ${route.path}`);
      });
};

const routerRegister = (app, container) => {
  registerRoutes(app, realUserRoutes, container);
  registerRoutes(app, calendarRoutes, container);
};

module.exports = routerRegister;