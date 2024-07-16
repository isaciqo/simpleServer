//const awilix = require('awilix');
//const BallController = require('./presentation/ball/ballController.js');
//const BallOperation = require('../../../src/app/operation/user/ballOperation.js');
//const BallService = require('../../../src/app/services/user/ballService.js');

//const container = awilix.createContainer({
//  injectionMode: awilix.InjectionMode.PROXY
//});

//container.register({
//  ballController: awilix.asClass(BallController).scoped(),
//  ballOperation: awilix.asClass(BallOperation).scoped(),
//  ballService: awilix.asClass(BallService).singleton()
//});

//module.exports = container;

const awilix = require('awilix');
const { Lifetime, InjectionMode } = awilix;

const container = awilix.createContainer({
    injectionMode: InjectionMode.PROXY
});

// Carregar os módulos conforme a estrutura fornecida
container.loadModules(
    [
        'src/app/operation/**/*.js',
        'src/app/services/**/*.js',
        'src/intergaces/html/presentation/**/*.js'
    ],
    {
        formatName: 'camelCase',
        resolverOptions: {
            injectionMode: InjectionMode.PROXY
        }
    }
);

module.exports = container;