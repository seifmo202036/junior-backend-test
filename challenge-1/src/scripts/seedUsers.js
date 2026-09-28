import "dotenv/config";

import mongoose from "mongoose";
import User from "../models/User.js";
import connectDatabase from "../config/database.js";

async function seedUsers() {
  await connectDatabase();

  const existingAdmin = await User.findOne({ email: "admin@example.com" });

  if (!existingAdmin) {
    await User.create({
      name: "Admin",
      email: "admin@example.com",
      password: "password123",
      role: "admin"
    });

    console.log("Admin user created");
  } else {
    console.log("Admin user already exists");
  }

  const existingUser = await User.findOne({ email: "user@example.com" });

  if (!existingUser) {
    await User.create({
      name: "Normal User",
      email: "user@example.com",
      password: "password123",
      role: "user"
    });

    console.log("Normal user created");
  } else {
    console.log("Normal user already exists");
  }

  await mongoose.connection.close();
}

seedUsers()
  .then(() => {
    console.log("Seeding finished");
  })
  .catch((error) => {
    console.error("Seeding failed:", error.message);

    process.exit(1);
  });
