const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyToken = (req, res, next) => {
  // Get token from Authorization header
  const bearerToken = req.headers["authorization"];

  console.log("bearerToken", req.headers["authorization"]);

  const token = bearerToken && bearerToken.split(" ")[1];

  console.log("token", token);

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No Token Provided." });
  }

  try {
    // Verify token with secret key
    const verified = jwt.verify(token, process.env.SECREAT_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = verifyToken;
