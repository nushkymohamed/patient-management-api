const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birthday: { type: String, required: true },
  contactNo: { type: String, required: true },
  photo: { type: String, required: true },
  nic: { type: String, required: true },
  notes: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Patient', patientSchema);
