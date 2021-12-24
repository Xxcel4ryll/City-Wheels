const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    const mimeExtension = {
      'image/jpeg': '.jpeg',
      'image/jpg': '.jpg',
      'image/png': '.png',
      'image/gif': '.gif',
    };
    cb(
      null,
      file.originalname + '-' + Date.now() + mimeExtension[file.mimetype]
    );
  },
});

const upload = multer({
  storage: storage,
});

module.exports = upload;
