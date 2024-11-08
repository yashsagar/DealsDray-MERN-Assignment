import express from "express";
import multer from "multer";

import * as employeeController from "../controllers/employee.controller.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./avatar"); // Folder where files will be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); // Unique filename
  },
});

const upload = multer({ storage });

router.post("/update", upload.single("imgUpload"), employeeController.update);
router.get("/dataFetch", employeeController.dataFetch);

export default router;
