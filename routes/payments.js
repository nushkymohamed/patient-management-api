const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');

// Create a new payment
router.post('/', async (req, res) => {
  try {
    const paymentData = {
      patient: req.body.patient, // Link payment to a patient
      date: req.body.date,
      amount: req.body.amount,
    };

    const payment = new Payment(paymentData);
    const savedPayment = await payment.save();
    res.json(savedPayment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a list of all payments with full patient details
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.find().populate('patient'); // Populate the patient field with full patient details

    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a payment by its ID with full patient details
router.get('/:id', async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate('patient'); // Populate the patient field with full patient details

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a payment record by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedPayment = await Payment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedPayment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a payment record by ID
router.delete('/:id', async (req, res) => {
  try {
    await Payment.findByIdAndRemove(req.params.id);
    res.json({ message: 'Payment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
