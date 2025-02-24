const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('uploads'));
app.use('/uploads/prescription', express.static('uploads/prescription'));

const db = require('./db');
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const patientRoutes = require('./routes/patients');
const prescriptionRoutes = require('./routes/prescriptions');
const paymentRoutes = require('./routes/payments');
const reportRoutes = require('./routes/reports');

app.use('/patients', patientRoutes);
app.use('/prescriptions', prescriptionRoutes);
app.use('/payments', paymentRoutes);
app.use('/reports', reportRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
