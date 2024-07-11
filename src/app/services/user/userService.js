const User = require('../../../database/models/user/userModel');
const Calendar = require('../../../database/models/calendar/calendarModel');
//const bcrypt = require('bcrypt');
const crypto = require('crypto');

const jwt = require('jsonwebtoken');
require('dotenv').config();
const nodemailer = require('nodemailer');
const JWT_SECRET = 'your_secret_key';  // Coloque uma chave secreta forte aqui
const { v4: uuidv4 } = require('uuid');

exports.createUser = async ({ email, name, role, senha }) => {
    // Implementação da lógica para criar um usuário
    try {
        const newUser = new User({ user_id: uuidv4(), email, name, role, senha, isConfirmed:false });
        const savedUser = await newUser.save();
        return savedUser;
    } catch (error) {
        throw error;
    }
};
exports.confirmEmail = async ({ token }) => {
    // Implementação da lógica para criar um usuário
    try {
        jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
            if (error) {
                return res.status(400).send('Invalid or expired token');
            }
            const { email, password } = decoded;
            console.log("decode ---- ", email, password)
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('User not exists');
            }
            user.isConfirmed = true
            const saveUser = await user.save();
            console.log(saveUser)
            });  
    } catch (error) {
        throw error;
    }
};

exports.confirmReset = async ({ token, senha }) => {
    // Implementação da lógica para criar um usuário
    try {
        jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
            if (error) {
                return res.status(400).send('Invalid or expired token');
            }
            const { email } = decoded;
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('User not exists');
            }
            user.senha = senha
            await user.save();
            });  
    } catch (error) {
        throw error;
    }
};


exports.requestReset = async ({ email }) => {
    try {
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log("Sending email to ---------------", email)
        const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
        });

        const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'isaciqo.42@gmail.com',
        subject: 'Email Confirmation',
        text: `use this token to reset your email: ${token}`
        };

        await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Erro ao enviar e-mail:', error);
        }

        console.log('E-mail enviado com sucesso:', info);
        console.log('E-mail enviado com sucesso:', info.response);
    });
    } catch (error) {
        throw error;
    }
};


exports.hashPassword = async (password) => {
    return crypto.createHash('sha256').update(password).digest('hex');
    //const salt = await bcrypt.genSalt(10);
    //return bcrypt.hash(password, salt);
};

exports.loginUser = async (email, senha) => {
    try {
        const user = await User.findOne({ email });
        console.log('returned User------', user)
        if (!user) {
            throw new Error('Authentication failed' );
        }
        if (!user.isConfirmed) {
            throw new Error('conta ainda não confirmada' );
        }
        console.log('senha------', senha)
        
        const token = await exports.comparePassword(senha, user.senha);
        

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
    return candidatePassword === storedPassword
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
