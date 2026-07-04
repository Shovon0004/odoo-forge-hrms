const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define absolute path to upload directory
const uploadDir = path.join(__dirname, '../../public/uploads');

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

// Configure Multer options
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB file size limit
  },
  fileFilter: function (req, file, cb) {
    // For profilePicture, restrict to image formats
    if (file.fieldname === 'profilePicture') {
      const isImg = file.mimetype.startsWith('image/');
      if (isImg) {
        cb(null, true);
      } else {
        cb(new Error('Only images are allowed for profile picture'), false);
      }
    } else {
      // For general attachments (like sick leaves), accept PDFs or images
      const allowedTypes = /jpeg|jpg|png|pdf/;
      const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
      const mimeType = allowedTypes.test(file.mimetype);

      if (extName && mimeType) {
        cb(null, true);
      } else {
        cb(new Error('Only PDF and image formats are allowed for attachments'), false);
      }
    }
  }
});

module.exports = upload;
