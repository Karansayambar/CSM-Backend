const express = require("express");
const connectDB = require("./config/connectDB");
const authRouter = require("./router/auth.route");
const chargetRoute = require("./router/station.route");
const cors = require("cors");

const app = express();
const PORT = 3000;
app.use(
  cors({
    // origin: "https://csm-frontend-kappa.vercel.app",
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/charger", chargetRoute);

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
  connectDB();
});
