import { User } from "../models/User.js";

const populate = async (req, res) => {
  try {
    const user = req.user;
    const getUser = await User.findById(req.user.id).select("-password");
    return res.status(200).json({
      success: true,
      message: "User Found",
      content: getUser,
      showBar: false,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      showBar: false,
    });
  }
};

export default populate;
