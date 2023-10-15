const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient', // This refers to the 'Patient' model
  },
  date: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
  },
});

module.exports = mongoose.model('Payment', paymentSchema);
