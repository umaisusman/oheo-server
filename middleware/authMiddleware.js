// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//   try {
//     const token = req.header("Authorization").split(" ")[1];
//     if (!token) return res.status(401).json({ message: "Unauthorized" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// // Admin Middleware
// const adminMiddleware = (req, res, next) => {
//   if (!req.user || req.user.role !== "admin") {
//     return res.status(403).json({ message: "Access denied. Admins only." });
//   }
//   next();
// };


// module.exports = { authMiddleware, adminMiddleware };


// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const authMiddleware = async (req, res, next) => {
//   const token = req.header("Authorization")?.split(" ")[1];

//   if (!token) return res.status(401).json({ message: "No token, authorization denied" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select("username email"); // Attach user data
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// module.exports = { authMiddleware };


const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];

        console.log("Auth Header:", authHeader); // Debugging log

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Token not provided or incorrect format" });
        }

        // Extract the token correctly
        const token = authHeader.replace("Bearer ", "").trim();
        console.log("Extracted Token:", token); // Debugging log

        if (!token) {
            return res.status(401).json({ error: "Token extraction failed" });
        }

        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log("JWT Verification Error:", err); // Debugging log
                return res.status(403).json({ error: "Invalid or expired token" });
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        console.error("Middleware Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

