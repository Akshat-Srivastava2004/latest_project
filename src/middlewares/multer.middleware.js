import multer from "multer";
import fs from "fs";
import path from "path";

// Define the directory path
const tempDir = path.join(`/LATESTONE/src`, "public/temp");

// Ensure the directory exists
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir); // path where all files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

export const upload = multer({
  storage,
});
