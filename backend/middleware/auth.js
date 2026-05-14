import jwt from "jsonwebtoken";

// 🔐 AUTH MIDDLEWARE
export const auth = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ msg: "No token provided" });
    }

    const token = header.replace("Bearer ", "");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);
    res.status(401).json({ msg: "Invalid token" });
  }
};

// 🔒 ADMIN MIDDLEWARE
export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Admin only access" });
  }
  next();
};