import e from "express";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || "").toLowerCase();
    const allowedExt = [".jpeg", ".jpg", ".png", ".webp"];
    const safeExt = allowedExt.includes(ext) ? ext : ".png"; // fallback extension

    // readable name (remove spaces + unsafe chars)
    const baseName = path
      .basename(file.originalname, ext)
      .trim()
      .replace(/\s+/g, "-") // spaces → dashes
      .replace(/[^a-z0-9\-]/gi, ""); // only letters, numbers, dashes

    const unique = Math.random().toString(36).substring(2, 10); // short unique id

    cb(null, `${baseName}-${unique}${safeExt}`);
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
