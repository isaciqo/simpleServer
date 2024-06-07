const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id: String,
  email: String,
  name: String,
  role: String,
  senha: String,
  schedulesCreated: { type: [String], required: true },
  schedulesJoined: { type: [String], required: true },
}); // Remove o campo _id padrão

const User = mongoose.model('User', userSchema);

module.exports = User;