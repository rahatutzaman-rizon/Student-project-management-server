// models/excel.js - Excel model
const xlsx = require('xlsx');
const { collections } = require('../config/db');

class ExcelModel {
  constructor() {
    this.collection = collections.excelCollection;
  }

  // Process and save Excel data
  async processExcelFile(buffer) {
    try {
      // Parse Excel file
      const workbook = xlsx.read(buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(worksheet);
      
      // Insert data into MongoDB
      return await this.collection.insertMany(data);
    } catch (error) {
      console.error('Error processing Excel file:', error);
      throw error;
    }
  }

  // Get all Excel data
  async getAllData() {
    try {
      return await this.collection.find().toArray();
    } catch (error) {
      console.error('Error getting Excel data:', error);
      throw error;
    }
  }
}

module.exports = ExcelModel;