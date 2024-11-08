import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    res.status(400).json({
      success: false,
      message: "all Fields are required",
      user: null,
    });
    return;
  }

  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  if (!passwordRegex.test(password)) {
    res.status(400).json({
      success: false,
      message: "Invalid Credentials",
      user: null,
    });
    return;
  }

  const user = await User.findOne({ userName });

  if (!user) {
    res.status(400).json({
      success: false,
      message: "Invalid Credentials",
      user: null,
    });
    return;
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (isPasswordCorrect) {
    req.session.user = user;
    res.status(200).json({
      success: true,
      user: user._doc.userName,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Invalid Credentials",
      user: null,
    });
  }
};

export const logout = (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie("authCookie");
    res.status(200).json({ success: true, message: "successfully logout" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    return res.status(500).send("Error occurred while logging out");
  }
};

export const authCheck = async (req, res) => {
  console.log(" auth triggered", req.cookies);
  try {
    console.log("req.session.user:", req.session.user.userName);
    res.status(200).json({ success: true, user: req.session.user.userName });
  } catch (error) {
    console.log("Error in authCheck controller", error.message);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", user: null });
  }
};
