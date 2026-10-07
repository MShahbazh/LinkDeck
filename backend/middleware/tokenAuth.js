import { SECRET_KEY } from "../index.js";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const verifyAPI = async (req, res, next) => {
  try {
    console.log("Raw Headers:", req.headers); 
console.log("Parsed Cookies:", req.cookies); 

    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        destroy: true,
        success: false,
        message: "No Token Provided",
        showBar: true,
      });
    }
    req.user = jwt.verify(token, SECRET_KEY);
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        
        destroy: true,
        success: false,
        message: "Token Corrupted",
        showBar: true,
      });
    }
    const result = await User.findOne({ _id: req.user.id }).select("-password");
    if (!result) {
      return res.status(401).json({
        
        destroy: true,
        success: false,
        message: "User Not Found",
        showBar: true,
      });
    }
    return next();
  } catch (error) {
    res.status(401).json({
      
      destroy: true,
      success: false,
      message: "Invalid or Expired Token",
      showBar: true,
    });
  }
};
