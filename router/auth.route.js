const { registerUser, loginUser } = require("../controllers/auth.controller");

const express = require("express");
const authRouter = express.Router();

authRouter.post("/register-user", registerUser);
authRouter.post("/login-user", loginUser);

module.exports = authRouter;
