import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/category.js";

import connectDb from "./config/db.js";
import createAdmin from "./utils/createAdmin.js";
import cors from 'cors';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);

// Startup sequence
const startServer = async () => {
  try {
    // 1️⃣ Connect to MongoDB
    await connectDb();

    // 2️⃣ Safe admin creation
    await createAdmin();  // ← async function, no next parameter needed

    // 3️⃣ Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Error starting server:", error.message);
    process.exit(1);
  }
};

startServer();