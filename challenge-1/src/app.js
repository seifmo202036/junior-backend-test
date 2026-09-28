import express from "express";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Product Inventory API is running"
  });
});

app.use("/auth", authRoutes);
app.use("/", productRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

app.use((error, req, res, next) => {
  if (error.type === "entity.parse.failed") {
    return res.status(400).json({
      message: "Request body must contain valid JSON"
    });
  }

  console.error(error);

  res.status(500).json({
    message: "Something went wrong on the server"
  });
});

export default app;
