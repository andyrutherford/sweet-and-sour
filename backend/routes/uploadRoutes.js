import express from 'express';
import path from 'path';
import multer from 'multer';
const router = express.Router();

// multer config
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extnameValid = filetypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetypeValid = filetypes.test(file.mimetype);

  if (extNameValid && mimeTypeValid) return cb(null, true);
  else cb('Only .jpg and .png files are allowed.');
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(rile, cb);
  },
});

router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default router;
