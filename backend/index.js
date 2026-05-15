import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/admin/categoryRoutes.js";
import categoryUserRoutes from "./routes/user/categoryRoutes.js";
import productRoutes from './routes/admin/productRoutes.js';
import userRoutes from './routes/admin/userRoutes.js';
import variantRoutes from "./routes/admin/varientRoutes.js";
import filterRoutes from './routes/admin/filterRoutes.js';
import connectDb from "./config/db.js";
import createAdmin from "./utils/createAdmin.js";
import productUserRoutes from "./routes/user/productRoutes.js";
import orderRoutes from "./routes/user/orderRoutes.js";
import adminOrderRoutes from "./routes/admin/orderRoutes.js";
import newsletterRoutes from './routes/admin/newsletterRoutes.js';
import couponRoutes from './routes/admin/coupanRoutes.js'

import cors from 'cors';

dotenv.config();

const app = express();

// ✅ Webhook route — express.json() se PEHLE
app.post(
  "/api/orders/webhook",
  express.raw({ type: "application/json" }),
  async (req, res, next) => {
    const { stripeWebhook } = await import("./controllers/user/orderController.js");
    stripeWebhook(req, res, next);
  }
);

// ✅ Phir express.json()
app.use(express.json());

// CORS
const allowedOrigins = [
  "https://johary-2.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error(`CORS policy: ${origin} not allowed`), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin/users", userRoutes);
app.use("/api/admin/categories", categoryRoutes);
app.use("/api/categories", categoryUserRoutes);
app.use("/api/admin/product", productRoutes);
app.use("/api/admin/filters", filterRoutes);
app.use("/api/products", productUserRoutes);
app.use("/api/admin/variants", variantRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin/orders", adminOrderRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/coupons', couponRoutes);



// Logger
app.use((req, res, next) => {
  console.log("REQ:", req.method, req.url);
  next();
});

// Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Server error", error: err.message });
});

// DB + Seed
connectDb()
  .then(async () => {
    console.log("Database connected");
    await createAdmin();
    console.log("Admin created");
  })
  .catch((error) => {
    console.error("Server startup error:", error);
  });

export default app;

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}