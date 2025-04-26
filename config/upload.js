// config/upload.js - File upload configuration
const multer = require('multer');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = { upload };