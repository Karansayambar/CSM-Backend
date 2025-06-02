const express = require("express");
const {
  createChargingStation,
  getStationList,
  getStation,
  editStationInfo,
  deleteStation,
} = require("../controllers/station.controller");
const verifyToken = require("../config/verifyToken");
const chargetRoute = express.Router();

chargetRoute.post("/add-charger-station", verifyToken, createChargingStation);
chargetRoute.get("/", verifyToken, getStationList);
chargetRoute.get("/:stationId", verifyToken, getStation);
chargetRoute.put("/update/:stationId", verifyToken, editStationInfo);
chargetRoute.delete("/delete/:stationId", verifyToken, deleteStation);

module.exports = chargetRoute;
