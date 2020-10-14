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

function checkFileType(req, file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extnameValid = filetypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetypeValid = filetypes.test(file.mimetype);

  if (extnameValid && mimetypeValid) return cb(null, true);
  else {
    req.fileValidationError = 'Forbidden extension';
    return cb(null, false, req.fileValidationError);
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(req, file, cb);
    console.log(cb);
  },
});

router.post('/', upload.single('image'), (req, res) => {
  if (req.fileValidationError) {
    res.status(422);
    throw new Error('Allowed file types: .jpg, .jpeg, .png');
  }
  res.send(`/${req.file.path}`);
});

export default router;
