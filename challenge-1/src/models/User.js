import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  }
});

userSchema.pre("save", async function () {
  if (this.isModified("password") === false) {
    return;
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(this.password, saltRounds);

  this.password = hashedPassword;
});

userSchema.methods.comparePassword = async function (plainPassword) {
  const isMatch = await bcrypt.compare(plainPassword, this.password);

  return isMatch;
};

export default mongoose.model("User", userSchema);
