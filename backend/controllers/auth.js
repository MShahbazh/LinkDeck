import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../index.js";

const sign = async (req, res) => {
  try {
    const { name, password, username } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const response = await User.create({
      name: name,
      password: hashedPassword,
      username: username,
      links: [],
      subline: "",
    });
    return res.status(201).json({
      success: true,
      message: "User Created Successfully",
      showBar: true,
    });
  } catch (error) {
    if (error.code == 11000) {
      return res.status(409).json({
        success: false,
        message: `Username Already Taken`,
        showBar: true,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      showBar: true,
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const getUser = await User.findOne({ username: username });
    if (!getUser) throw new Error("Username Does Not Exist");
    const match = await bcrypt.compare(password, getUser.password);
    if (match) {
      const payload = {
        id: getUser.id,
        username: getUser.username,
      };
      const token = jwt.sign(payload, SECRET_KEY);
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge:7*24*60*60*3600

      });

      return res.status(200).json({
        success: true,
        showBar: true,
        message: "User Successfully logged In",
        content: {
          name: getUser.name,
          username: getUser.username,
          subline: getUser.subline,
          links: getUser.links,
        },
      });
    } else throw new Error("Incorrect Password");
  } catch (error) {    
    console.log(error)
    const errors = ["Username Does Not Exist", "Incorrect Password"];
    if (errors.includes(error.message)) {
      return res.status(401).json({
        success: false,
        message: error.message,
        showBar: true,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      showBar: true,
    });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
    showBar: true,
  });
};

export { sign, login, logout };
