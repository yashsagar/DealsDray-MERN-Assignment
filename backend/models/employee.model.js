import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
    match: /.+\@.+\..+/,
  },
  mobileNo: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/, // Assuming a 10-digit mobile number format
  },
  designation: {
    type: String,
    enum: ["hr", "manager", "sales"],
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  course: {
    type: [String],
    enum: ["mca", "bca", "bsc"],
    required: true,
  },
  imgUpload: {
    type: String, // URL or file path for the uploaded image
    required: false,
  },
});

export const Employee = mongoose.model("employee", employeeSchema);
