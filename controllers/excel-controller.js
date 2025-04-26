// controllers/excel-controller.js - Excel controller
const ExcelModel = require('../models/excel');

class ExcelController {
  constructor() {
    this.excelModel = new ExcelModel();
  }

  // Upload Excel file
  uploadExcel = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      
      await this.excelModel.processExcelFile(req.file.buffer);
      res.status(200).json({ message: 'Excel data uploaded successfully' });
    } catch (error) {
      console.error('Error in uploadExcel:', error);
      res.status(500).json({ message: 'Error uploading Excel data' });
    }
  };

  // Get all Excel data
  getAllData = async (req, res) => {
    try {
      const data = await this.excelModel.getAllData();
      res.status(200).json(data);
    } catch (error) {
      console.error('Error in getAllData:', error);
      res.status(500).json({ message: 'Error fetching data' });
    }
  };
}

module.exports = ExcelController;