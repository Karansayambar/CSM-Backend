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

chargetRoute.post("/add-charger-station", createChargingStation);
chargetRoute.get("/", getStationList);
chargetRoute.get("/:stationId", verifyToken, getStation);
chargetRoute.put("/update/:stationId", editStationInfo);
chargetRoute.delete("/delete/:stationId", deleteStation);

module.exports = chargetRoute;
