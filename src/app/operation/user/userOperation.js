const userService = require('../../services/user/userService');
const sendEmailService = require('../../services/user/sendEmailService');

exports.createUser = async ({ email, name, role, senha }) => {
    try {
      const hashedPassword = await userService.hashPassword(senha);

      await sendEmailService.sendMail({ email, name, role, senha })
      return await userService.createUser({ email, name, role, senha: hashedPassword });
    } catch (error) {
      throw error;
    }
};
exports.confirmEmail = async ({ token }) => {
  try {

    return await userService.confirmEmail({ token });
  } catch (error) {
    throw error;
  }
};

exports.requestReset = async ({ email }) => {
  try {

    return await userService.requestReset({ email });
  } catch (error) {
    throw error;
  }
};

exports.confirmReset = async ({ token, senha }) => {
  try {
    console.log('senha----------', senha)
    const hashedPassword = await userService.hashPassword(senha);
    await userService.confirmReset({ token, senha: hashedPassword });
  } catch (error) {
    throw error;
  }
};


exports.loginUser = async (email, senha) => {
    try {
        const response = await userService.loginUser(email, senha);
        if(!response.token){
            throw new Error('Authentication failed')
        }
        
        response.token = await userService.generateToken(email);
        return response

    } catch (error) {
        console.log('error', error)
        throw error;
    }
};

exports.createCalendar = async ({ createdBy, users, calendarInformation, name, description }) => {
    try {
        return await userService.createCalendar({ createdBy, users, calendarInformation, name, description });
      } catch (error) {
        throw error;
      }
};


exports.updateSchedulesCreated = async ({ id, schedulesCreated }) => {
  try {
    console.log('schedulesCreated---------in operation', schedulesCreated)
      return await userService.updateSchedulesCreated({ id, schedulesCreated });
    } catch (error) {
      throw error;
    }
};

exports.updateSchedulesJoined = async ({ id, schedulesJoined }) => {
  try {
      return await userService.updateSchedulesJoined({ id, schedulesJoined });
    } catch (error) {
      throw error;
    }
};
exports.updateCalendar = async ({ id, calendarInformation }) => {
    try {
        return await userService.updateCalendar({ id, calendarInformation });
      } catch (error) {
        throw error;
      }
};

exports.listCalendar = async ({ createdBy }) => {
  try {
      return await userService.listCalendar({ createdBy });
    } catch (error) {
      throw error;
    }
};

exports.getCalendar = async ({ id }) => {
  try {
      return await userService.getCalendar({ id });
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
