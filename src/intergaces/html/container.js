const { createContainer, asClass, asFunction, asValue } = require('awilix');
const { Lifetime, InjectionMode } = require('awilix');
const { loadModules } = require('awilix');

// Criar um contêiner Awilix
const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
});

// Carregar módulos dos diretórios especificados
container.loadModules([
  'src/app/operations/**/*.js',
  'src/app/services/**/*.js'
], {
  formatName: 'camelCase', // Formatar os nomes dos módulos para camelCase
  resolverOptions: {
    lifetime: Lifetime.SCOPED // Definir o tempo de vida dos módulos
  }
});

module.exports = container;