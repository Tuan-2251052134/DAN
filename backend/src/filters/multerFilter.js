const multer = require("multer");

// Lưu file tạm trên RAM dưới dạng buffer
const storage = multer.memoryStorage();
const multerFilter = multer({ storage });

module.exports = multerFilter;
