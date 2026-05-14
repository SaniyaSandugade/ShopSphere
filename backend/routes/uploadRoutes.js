import express from "express";
import multer from "multer";

const router = express.Router();

// store locally
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// upload route
router.post("/", upload.single("image"), (req, res) => {
  res.json({
    msg: "Image uploaded",
    file: req.file
  });
});

export default router;