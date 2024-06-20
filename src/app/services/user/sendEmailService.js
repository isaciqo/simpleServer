require('dotenv').config();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

exports.sendMail = async ({ email, senha }) => {
    // Implementação da lógica para criar um usuário
    try {
        const token = jwt.sign({ email, senha }, process.env.JWT_SECRET, { expiresIn: '1h' });
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
        text: `Click on the following link to confirm your email: http://localhost:3030/confirm/${token}`
        };

        await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Erro ao enviar e-mail:', error);
        }

        console.log('E-mail enviado com sucesso:', info.response);
        return token
    });
    } catch (error) {
        throw error;
    }
};