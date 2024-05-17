const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    role: String,
    senha: String
});

module.exports = mongoose.model('User', userSchema);
