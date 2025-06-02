const Charger = require("../module/station.module");

const createChargingStation = async (req, res) => {
  // get data from req
  const {
    stationName,
    latitude,
    longitude,
    status,
    powerOutput,
    connectorType,
  } = req.body.stationData;

  // check all data is present
  if (
    (!stationName, !latitude, !longitude, !status, !powerOutput, !connectorType)
  ) {
    return res.status(404).json({
      message: "All data must be required",
    });
  }

  try {
    const chagerStation = new Charger({
      stationName,
      latitude,
      longitude,
      status,
      powerOutput,
      connectorType,
    });

    // save data in DB
    await chagerStation.save();

    return res.status(200).json({
      message: "Charger station created successfully",
      chagerStation,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getStationList = async (req, res) => {
  try {
    const stationList = await Charger.find();
    console.log(stationList);
    return res.status(200).json({
      message: "Station retrive successfully",
      stationList,
    });
  } catch (error) {
    console.error("Error retrieving stations:", error);
    return res.status(500).json({
      message: "Failed to retrieve station list",
      error: error.message,
    });
  }
};

const getStation = async (req, res) => {
  const { stationId } = req.params;
  console.log("Station ID:", stationId);
  try {
    const station = await Charger.findById(stationId);
    if (!station) {
      return res.status(404).json({ message: "Station not found" });
    }
    console.log("Station Data:", station);
    return res.status(200).json({
      message: "Station retrieved successfully",
      station,
    });
  } catch (error) {
    console.error("Error fetching station:", error);
    return res.status(500).json({
      message: "Failed to retrieve station",
      error: error.message,
    });
  }
};

const editStationInfo = async (req, res) => {
  const {
    stationName,
    latitude,
    longitude,
    status,
    powerOutput,
    connectorType,
  } = req.body.stationData;

  const { stationId } = req.params;

  try {
    const stationData = await Charger.findById(stationId);
    if (!stationData) {
      return res.status(404).json({
        message: "Charging station not found",
      });
    }

    // Update fields
    stationData.stationName = stationName;
    stationData.latitude = latitude;
    stationData.longitude = longitude;
    stationData.status = status;
    stationData.powerOutput = powerOutput;
    stationData.connectorType = connectorType;

    await stationData.save();

    return res.status(200).json({
      message: "Station info updated successfully",
      station: stationData,
    });
  } catch (error) {
    console.error("Error updating station:", error);
    return res.status(500).json({
      message: "Failed to update station info",
      error: error.message,
    });
  }
};

const deleteStation = async (req, res) => {
  const { stationId } = req.params;

  try {
    const station = await Charger.findById(stationId);

    if (!station) {
      return res.status(404).json({
        message: "Station not found",
      });
    }

    await Charger.deleteOne({ _id: stationId });

    return res.status(200).json({
      message: "station deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting station:", error);
    return res.status(500).json({
      message: "Failed to delete station",
      error: error.message,
    });
  }
};

module.exports = {
  createChargingStation,
  getStationList,
  getStation,
  editStationInfo,
  deleteStation,
};
