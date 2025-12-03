import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname + Date.now());
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|webp/;
  const extname = allowedFileTypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );
  const mimetype = allowedFileTypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Error: Images Only! (jpeg, jpg, png, webp)");
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
});
