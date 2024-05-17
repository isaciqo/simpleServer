const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.createUser = async ({ email, name, role, senha }) => {
    // Implementação da lógica para criar um usuário
    try {
        const newUser = new User({ email, name, role, senha });
        const savedUser = await newUser.save();
        return savedUser;
    } catch (error) {
        throw error;
    }
};

exports.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

exports.loginUser = async (email, senha) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        return await exports.comparePassword(senha, user.senha);
        
    } catch (error) {
        throw error;
    }
};

exports.comparePassword = async (candidatePassword, storedPassword) => {
    return bcrypt.compare(candidatePassword, storedPassword);
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
