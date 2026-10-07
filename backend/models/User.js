import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  subline: {
    type: String,
    trim: true,
  },
  visible: {
    type: Boolean,
    default: true,
  },
  links: [
    {
      index: {
        type: String,
        required: true,
        trim: true,
      },
      link: {
        type: String,
        required: true,
        trim: true,
      },
      subtext: {
        type: String,
      },
    },
  ],
});

const User = mongoose.model("User", UserSchema);
export { User };
