import * as mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 2,
  },
  incorrectQuestions: {
    type: [String],
    default: [],
  },
  correctQuestions: {
    type: [String],
    default: [],
  },
  roles: {
    type: [String],
    default: [],
  },
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
