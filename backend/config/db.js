const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ckarweru69_db_user:PfKK0uTOJJrl1pzO@cluster0.hfeaz7a.mongodb.net/?appName=Cluster0"
    );
    console.log("MongoDB Atlas Connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;