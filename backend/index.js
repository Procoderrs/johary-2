import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/admin/categoryRoutes.js";
import categoryUserRoutes from "./routes/user/categoryRoutes.js";
import productRoutes from './routes/admin/productRoutes.js'
import userRoutes from './routes/admin/userRoutes.js'
import variantRoutes from "./routes/admin/varientRoutes.js";
import filterRoutes from './routes/admin/filterRoutes.js'
import connectDb from "./config/db.js";
import createAdmin from "./utils/createAdmin.js";
import cors from 'cors';

dotenv.config();
const app = express();

app.use(express.json());




// ----- CORS Setup -----
const allowedOrigins = [
  "https://johary-2.vercel.app/dashboard",
  "http://localhost:5173"
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like Postman or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `CORS policy: The origin ${origin} is not allowed.`;
      return callback(new Error(msg), false);
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
// ✅ Category APIs
app.use("/api/admin/users", userRoutes);
app.use("/api/admin/categories", categoryRoutes);
app.use("/api/categories", categoryUserRoutes);
app.use("/api/admin/product", productRoutes);
app.use("/api/admin/filters", filterRoutes);
app.use("/api/admin/variants", variantRoutes);
// Startup sequence



app.use((req, res, next) => {
  console.log("REQ:", req.method, req.url);
  next();
});

// ----- Global Error Handler -----
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Server error", error: err.message });
});

// ----- DB + Seed -----
connectDb()
  .then(async () => {
    console.log("Database connected");
    //await createAdmin();
   
    console.log("Admin created");
  })
  .catch((error) => {
    console.error("Server startup error:", error);
  });

// ----- Export for Vercel -----
 export default app;

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
