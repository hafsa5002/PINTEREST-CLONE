const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary-config');
const path = require('path');

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const ext = path.extname(file.originalname); // .jpg or .png
    const filenameWithoutExt = path.basename(file.originalname, ext);

    return {
      folder: 'pinterest_clone',
      allowed_formats: ['jpg', 'jpeg', 'png'],
      public_id: `${filenameWithoutExt}-${Date.now()}`, // unique filename
      transformation: [{ width: 800, height: 800, crop: 'limit' }],
    };
  },
});

// Create Multer middleware
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

module.exports = upload;
