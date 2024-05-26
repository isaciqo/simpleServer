const User = require('../models/userModel');
const Calendar = require('../models/calendarModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key';  // Coloque uma chave secreta forte aqui


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
            throw new Error('Authentication failed' );
        }
        return await exports.comparePassword(senha, user.senha);
        
    } catch (error) {
        throw error;
    }
};

exports.comparePassword = async (candidatePassword, storedPassword) => {
    return bcrypt.compare(candidatePassword, storedPassword);
  };

exports.generateToken = async (email) => {
    return jwt.sign({ email }, JWT_SECRET, { expiresIn: '2m' });
};

exports.updateSchedulesCreated = async ({ id, schedulesCreated }) => {
    try {
        console.log('schedulesCreated---------', schedulesCreated)
        const user = await User.findById(id);        
        console.log('schedulesCreated---------', schedulesCreated)
        if (!user) {
            throw new Error('User not found' );
        }
        user.schedulesCreated.push(schedulesCreated)
        console.log(' user.schedulesCreated---------',  user.schedulesCreated)
        const updatedUser = await user.save();

        return updatedUser;
    } catch (error) {
        throw error;
    }
};
exports.updateSchedulesJoined = async ({ id, schedulesJoined }) => {
    try {
        const user = await User.findById(id);        

        if (!user) {
            throw new Error('User not found' );
        }
        
        user.schedulesJoined.push(schedulesJoined)
        
        const updatedUser = await user.save();

        return updatedUser;
    } catch (error) {
        throw error;
    }
};

exports.createCalendar = async ({ createdBy, users, calendarInformation }) => {
    // Implementação da lógica para criar um usuário
    try {
        const newCalendar = new Calendar({
            createdBy,
            users,
            calendarInformation
        });
        console.log('calendar in service createCalendar', newCalendar)
        const savedCalendar = await newCalendar.save();
        return savedCalendar;
    } catch (error) {
        throw error;
    }
};

exports.updateCalendar = async ({ id, calendarInformation }) => {
    try {
        const calendar = await Calendar.findById(id);        

        if (!calendar) {
            throw new Error('Calendar not found' );
        }
        calendarInformation.map((calendarOption) => calendar.calendarInformation.push(calendarOption) )
        
        const updatedCalendar = await calendar.save();

        return updatedCalendar;
    } catch (error) {
        throw error;
    }
};


exports.listCalendar = async ({ createdBy }) => {
    try {
        const calendars = await Calendar.find({ createdBy });        

        if (!calendars.length) {
            throw new Error('No calendars found for the specified user' );
        }

        return calendars
    } catch (error) {
        throw error;
    }
};

exports.getCalendar = async ({ id }) => {
    try {
        const calendar = await Calendar.findById(id);        

        if (!calendar) {
            throw new Error('Calendar not found' );
        }

        return calendar
    } catch (error) {
        throw error;
    }
};



exports.updateUser = async (userId, userData) => {
    // Implementação da lógica para atualizar um usuário
};

exports.deleteUser = async (userId) => {
    // Implementação da lógica para excluir um usuário
};
