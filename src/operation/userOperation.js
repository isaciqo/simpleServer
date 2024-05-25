const userService = require('../services/userService');

exports.createUser = async ({ email, name, role, senha }) => {
    try {
      const hashedPassword = await userService.hashPassword(senha);
      return await userService.createUser({ email, name, role, senha: hashedPassword });
    } catch (error) {
      throw error;
    }
};

exports.loginUser = async (email, senha) => {
    try {
        const isloged = await userService.loginUser(email, senha);
        if(!isloged){
            throw new Error('Authentication failed')
        }
        return userService.generateToken(email);

    } catch (error) {
        console.log('error', error)
        throw error;
    }
};

exports.createCalendar = async ({ createdBy, users, calendarInformation }) => {
    try {
        return await userService.createCalendar({ createdBy, users, calendarInformation });
      } catch (error) {
        throw error;
      }
};

exports.getUserById = async (userId) => {
    // Implementação da lógica para obter um usuário por ID
};

exports.updateUser = async (userId, userData) => {
    // Implementação da lógica para atualizar um usuário
};

exports.deleteUser = async (userId) => {
    // Implementação da lógica para excluir um usuário
};
