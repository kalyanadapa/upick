// import multer from "multer";

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "./public/temp")
//     },
//     filename: function (req, file, cb) {
      
//       cb(null, file.originalname)
//     }
//   })
  
// export const upload = multer({ 
//     storage, 
// })
import fs from 'fs';
import path from 'path';
import multer from "multer";
// Correct the path resolution for the 'temp' folder
const uploadDir = path.resolve('public', 'temp');

// Log the corrected path to verify it's correct
console.log("Resolved upload directory path:", uploadDir);

// Check if the directory exists, and create it if it doesn't
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);  // Use the corrected path
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);  // Keep the original file name
  }
});

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
});
