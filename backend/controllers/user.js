import { User } from "../models/User.js";
import { linkSchema } from "../schemas/linkSchema.js";

const updateUser = async (req, res) => {
  const { element, content } = req.body;

  try {
    const result = await User.updateOne(
      { _id: req.user.id },
      { [element]: content },
    );
    const getUser = await User.findOne({ _id: req.user.id }).select(
      "-password",
    );
    let messageSend = "Field Updated Successfully";
    if (element == "links") {
      messageSend = "Links Deleted Successfully";
    }
    return res.status(200).json({
      success: true,
      showBar: true,
      message: messageSend,
      content: getUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      showBar: true,
    });
  }
};

const addLink = async (req, res) => {
  try {
    const { index, link, subtext } = req.body;
    const result = linkSchema.safeParse({ index: index, link: link });
    if (!result.success) {
      return res.status(401).json({
        success: false,
        message: result.error.issues[0].message,
        showBar: true,
      });
    }
    const getUser = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $push: { links: { index, link, subtext } } },
      { returnDocument: "after" },
    ).select("-password");
    return res.status(200).json({
      success: true,
      showBar: true,
      message: "Link Added Successfully",
      content: getUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      showBar: true,
    });
  }
};

const deleteLink = async (req, res) => {
  try {
    const { id } = req.body;
    const getUser = await User.findByIdAndUpdate(
      { _id: req.user.id },
      { $pull: { links: { _id: id } } },
      { returnDocument: "after" },
    ).select("-password");
    return res.status(200).json({
      success: true,
      showBar: true,
      message: "Link Deleted Successfully",
      content: getUser,
    });
  } catch (error) {
    
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      showBar: true,
    });
  }
};

const editLink = async (req, res) => {
  try {
    const { id, index, link, subtext } = req.body;
    const result = linkSchema.safeParse({ index: index, link: link });
    if (!result.success) {
      return res.status(401).json({
        success: false,
        message: result.error.issues[0].message,
        showBar: true,
      });
    }
    const getUser = await User.findOneAndUpdate(
      { _id: req.user.id, "links._id": id },
      { $set: { "links.$": { _id: id, index, link, subtext } } },
      { returnDocument: "after" },
    ).select("-password");
    return res.status(200).json({
      success: true,
      showBar: true,
      message: "Link Updated Successfully",
      content: getUser,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      showBar: true,
    });
  }
};

export { updateUser, addLink, deleteLink, editLink };
