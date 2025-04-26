// routes/excel-routes.js - Excel routes
const express = require('express');
const { upload } = require('../config/upload');
const ExcelController = require('../controllers/excel-controller');

const router = express.Router();
const controller = new ExcelController();

// Routes
router.post('/upload', upload.single('file'), controller.uploadExcel);
router.get('/data', controller.getAllData);

module.exports = router;