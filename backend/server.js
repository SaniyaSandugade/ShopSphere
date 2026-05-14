import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// SECURITY
import helmet from "helmet";
import rateLimit from "express-rate-limit";

// ROUTES
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

// MIDDLEWARE
import { auth } from "./middleware/auth.js";

dotenv.config();

const app = express();


// =============================
// SECURITY MIDDLEWARE
// =============================

// Helmet Security Headers

app.use(helmet());

// Rate Limiting

const limiter = rateLimit({

  windowMs: 15 * 60 * 1000, // 15 minutes

  max: 100, // limit each IP to 100 requests

  message: "Too many requests. Please try again later."

});

app.use(limiter);


// =============================
// NORMAL MIDDLEWARE
// =============================

app.use(express.json());

app.use(cors());


// =============================
// ROUTES
// =============================

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/upload", uploadRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/orders", orderRoutes);


// =============================
// PROTECTED ROUTE
// =============================

app.get("/api/protected", auth, (req, res) => {

  res.json({

    msg: "You are authorized",

    user: req.user

  });

});


// =============================
// TEST ROUTE
// =============================

app.get("/", (req, res) => {

  res.send("ShopSphere API Running");

});


// =============================
// DATABASE CONNECTION
// =============================

mongoose.connect(process.env.MONGO_URL)

  .then(() => console.log("MongoDB Connected"))

  .catch(err => console.log(err));


// =============================
// SERVER START
// =============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>

  console.log(`Server running on port ${PORT}`)

);