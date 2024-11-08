import { Employee } from "../models/employee.model.js";

export const update = async (req, res) => {
  try {
    const { name, email, mobileNo, designation, gender, course } = req.body;

    console.log(req.file);
    const avatar = req.file ? `/avatar/${req.file.filename}` : null; // Store file path
    const coursesArray =
      typeof course === "string" ? course.split(",") : course;
    console.log(avatar);

    const employee = new Employee({
      name,
      email,
      mobileNo,
      designation,
      gender,
      course: coursesArray,
      imgUpload: avatar,
    });

    await employee.save();

    res.json({
      success: true,
      message: "Employee data saved successfully",
      // data: employee,
    });
  } catch (err) {
    console.error("Error saving employee data:", err);
    res.status(500).json({
      success: false,
      message: "Failed to save employee data",
      error: err.message,
    });
  }
};

export const dataFetch = async (req, res) => {
  const data = await Employee.find({});
  res.json({ success: true, data });
};

export const deleteEmployee = async (req, res) => {
  const data = await Employee.find({});
  res.json({ success: true, data });
};
