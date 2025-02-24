const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Prescription = require('../models/Prescription');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/prescription'); // destination folder for uploaded files later chane it to cloudinary / any cloud
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage });

// multiple file uploads
router.post('/', upload.array('files', 5), async (req, res) => {
  try {
    const prescriptionData = {
      patient: req.body.patient, 
    };
    const prescription = new Prescription(prescriptionData);
    prescription.files = req.files.map((file) => file.path);

    const savedPrescription = await prescription.save();
    res.json(savedPrescription);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const prescriptions = await Prescription.find().populate('patient');
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id).populate(
      'patient'
    );

    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }

    res.json(Prescription);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedPrescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedPrescription);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Prescription.findByIdAndRemove(req.params.id);
    res.json({ message: 'Prescription deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
