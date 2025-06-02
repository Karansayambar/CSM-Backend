const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://karansayambar:chargingstationmanager@cluster0.swjkwtb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("Database connected successfully");
};

module.exports = connectDB;
