const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const db= require('./models/db');
const Student = db.Student;


// Attendance Schema
const attendanceSchema = new mongoose.Schema({
  name:String,
  register_no: String,
  timestamp: { type: Date, default: Date.now },
});
const Attendance = mongoose.model('Attendance', attendanceSchema);



// API: Mark Attendance
app.post('/mark-attendance', async (req, res) => {
  const { register_no } = req.body;

  const student = await Student.findOne({ register_no });
   let name=student.name;
   console.log(name);
   
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }
  await Attendance.create({name, register_no });
  res.json({ message: `Attendance marked for ${student.name}` });
});





// Get Today’s Attendance
app.get('/present-today', async (req, res) => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const records = await Attendance.find({
    timestamp: { $gte: start, $lte: end },
  });

  const students = await Student.find({
   
    register_no: { $in: records.map(r => r.register_no) }
  });

  res.json(students);
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});

