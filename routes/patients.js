const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Patient = require('../models/Patient');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); //file upload path need to cange this later for cloudinary/cloud
  },
  filename: function (req, file, cb) {
    const filename = `${file.fieldname}-${Date.now()}${path.extname(
      file.originalname
    )}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const patientData = {
      name: req.body.name,
      birthday: req.body.birthday,
      contactNo: req.body.contactNo,
      photo: req.file ? req.file.filename : null,
      nic: req.body.nic,
      notes: req.body.notes,
      date: req.body.date,
    };

    const patient = new Patient(patientData);
    const savedPatient = await patient.save();
    res.json(savedPatient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/search', async (req, res) => {
  try {
    const query = {};

    if (req.query.name) {
      query.name = { $regex: req.query.name, $options: 'i' };
    }
    if (req.query.birthday) {
      query.birthday = req.query.birthday;
    }
    if (req.query.contactNo) {
      query.contactNo = req.query.contactNo;
    }
    if (req.query.nic) {
      query.nic = req.query.nic;
    }
    if (req.query.date) {
      query.date = req.query.date;
    }

    const patients = await Patient.find(query);

    if (patients.length === 0) {
      return res
        .status(404)
        .json({ message: 'No patients found with the provided criteria' });
    }

    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedPatient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    await Patient.findByIdAndRemove(req.params.id);
    res.json({ message: 'Patient deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
