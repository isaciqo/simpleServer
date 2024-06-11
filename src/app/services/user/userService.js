const User = require('../../../database/models/user/userModel');
const Calendar = require('../../../database/models/calendar/calendarModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key';  // Coloque uma chave secreta forte aqui
const { v4: uuidv4 } = require('uuid');

exports.createUser = async ({ email, name, role, senha }) => {
    // Implementação da lógica para criar um usuário
    try {
        const newUser = new User({ user_id: uuidv4(), email, name, role, senha });
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
        const token = await exports.comparePassword(senha, user.senha);
        console.log('returned User------', user)

        const response = {
            token, 
            user_id: user.user_id,
            schedulesCreated: user.schedulesCreated,
            schedulesJoined: user.schedulesJoined
        }

        console.log('returned response------', response)
        return response
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

exports.createCalendar = async ({ createdBy, users, calendarInformation, name, description }) => {
    // Implementação da lógica para criar um usuário
    try {
        const user = await User.findOne({user_id: createdBy});        
        if (!user) {
            throw new Error('User not found' );
        }
        
        const newCalendar = new Calendar({
            calendar_id: uuidv4(),
            createdBy,
            users,
            calendarInformation,
            name, 
            description
        });

        const schedulesInformation = {
            calendar_id: newCalendar.calendar_id,
            name, 
            description
        }
        user.schedulesCreated.push(schedulesInformation)
        await user.save();
        console.log('calendar in service createCalendar', newCalendar)
        const savedCalendar = await newCalendar.save();
        return savedCalendar;
    } catch (error) {
        throw error;
    }
};

exports.updateCalendar = async ({ id, calendarInformation }) => {
    try {
        const calendar = await Calendar.findOne({calendar_id: id});        

        if (!calendar) {
            throw new Error('Calendar not found' );
        }
        
        const newInformation = calendarInformation[0]
        console.log('newInformation -------------', newInformation)
        calendar.calendarInformation.push(newInformation)
        console.log('calendar -------------', calendar)
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
        const calendar = await Calendar.findOne({calendar_id: id});        

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
