const mongoose = require("mongoose");

const chargerSchema = new mongoose.Schema({
  stationName: {
    type: String,
    required: true,
    min: 10,
    max: 50,
    unique: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive", "coming soon", "under maintenance"],
    default: "active",
    required: true,
  },
  powerOutput: {
    type: Number,
    required: true,
  },
  connectorType: {
    type: String,
    enum: ["type 1", "type 2", "css", "CHAdeMO"],
    default: "type 1",
    required: true,
  },
});

const Charger = mongoose.model("Charger", chargerSchema);
module.exports = Charger;
