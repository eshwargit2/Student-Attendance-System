const mongoose = require('mongoose');
const dotenv= require('dotenv');
dotenv.config();


mongoose.connect('mongodb://localhost:27017/qr-attendance', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Student Schema
const studentSchema = new mongoose.Schema({
  name: String,
  register_no: String,
  department: String,
});
const Student = mongoose.model('Student', studentSchema);
module.exports = {Student};