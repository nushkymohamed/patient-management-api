const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const PDFDocument = require('pdfkit');
// Generate a revenue report for a specific time period and create a PDF report
router.get('/revenue-report', async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const payments = await Payment.find({
      date: { $gte: startDate, $lte: endDate },
    });

    // Calculate total revenue
    const totalRevenue = payments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );

    // Create a PDF document
    const doc = new PDFDocument();

    // Set PDF response headers and attachment name
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="revenue-report.pdf"`
    );
    doc.pipe(res);

    // Add styling and content to the PDF
    doc.fontSize(18).text('Revenue Report', { align: 'center' });
    doc.moveDown(1);

    doc.fontSize(12).text(`Start Date: ${startDate}`);
    doc.fontSize(12).text(`End Date: ${endDate}`);
    doc.moveDown(1);

    doc.fontSize(16).text('Total Revenue', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(14).text(`Rs. ${totalRevenue.toFixed(2)}`);
    doc.end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
