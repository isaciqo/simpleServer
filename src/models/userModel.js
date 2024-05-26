const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    role: String,
    senha: String,
    schedulesCreated: { type: [String], required: true },
    schedulesJoined: { type: [String], required: true },
});

module.exports = mongoose.model('User', userSchema);
