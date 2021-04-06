import * as mongoose from "mongoose";
import bcrypt from "bcryptjs";

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

UserSchema.methods.comparePasswords = async function (password) {
  const user = this;

  const isMatch = await bcrypt.compare(password, user.password);
  return { isMatch };
};

UserSchema.pre("save", async function (next) {
  const user = this;

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;

    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.post("save", async (error, doc, next) => {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("Username is already used."));
  } else {
    next(error);
  }
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
