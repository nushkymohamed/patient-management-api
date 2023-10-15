const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient', // This refers to the 'Patient' model
  },
  date: {
    type: Date,
    default: Date.now,
  },
  files: {
    type: [String], 
  },
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
