import { User } from "../models/User.js";

export const getProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const getUser = await User.findOne({ username: username }).select(
      "-password",
    );
    if (!getUser) throw new Error("User Not Found");
    if (!getUser.visible) {
      return res.status(200).json({
        success: true,
        content: null,
      });
    }
    return res.status(200).json({
      success: true,
      content: getUser,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      content: error.message,
    });
  }
};
