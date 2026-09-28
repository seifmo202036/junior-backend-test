import jwt from "jsonwebtoken";
import User from "../models/User.js";

async function login(req, res, next) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!email) {
      return res.status(400).json({
        message: "Email is required"
      });
    }

    if (!password) {
      return res.status(400).json({
        message: "Password is required"
      });
    }

    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const isPasswordCorrect = await existingUser.comparePassword(password);

    if (isPasswordCorrect === false) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const tokenPayload = {
      userId: existingUser._id,
      role: existingUser.role
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d"
    });

    return res.status(200).json({
      message: "Login successful",
      token: token
    });
  } catch (error) {
    next(error);
  }
}

export { login };
