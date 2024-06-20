const mongoose = require('mongoose');
const schedulesInformationSchema = new mongoose.Schema({
  calendar_id: String,
  name: String, 
  description: String,
}, { _id: false });

const userSchema = new mongoose.Schema({
  user_id: String,
  email: String,
  name: String,
  role: String,
  senha: String,
  schedulesCreated: { type: [schedulesInformationSchema], required: true },
  schedulesJoined: { type: [schedulesInformationSchema], required: true },
  isConfirmed: Boolean
}); // Remove o campo _id padrão

const User = mongoose.model('User', userSchema);

module.exports = User;