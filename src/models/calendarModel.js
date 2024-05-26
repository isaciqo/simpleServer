const mongoose = require('mongoose');

const CalendarInformationSchema = new mongoose.Schema({
  user: { type: String, required: true },
  firstDay: { type: String, required: true },
  lastDay: { type: String, required: true },
  status: { type: String, required: true }
}, { _id: false });

const CalendarSchema = new mongoose.Schema({
  createdBy: { type: String, required: true },
  users: { type: [String], required: true },
  calendarInformation: { type: [CalendarInformationSchema] }
});

module.exports = mongoose.model('Calendar', CalendarSchema);