const mongoose = require("mongoose");
const { Schema } = mongoose;
const fs = require("fs");
require("dotenv").config();

async function main() {
  const mongoUri = process.env.MONGODB_URI;
  const collection = process.env.MONGODB_COLLECTION;

  const args = process.argv.slice(2);
  const command = args[0];

  // Connect to MongoDB
  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB!");

  // Define schema
  const MovieSchema = Schema(
    {
      title: String,
      year: Number,
      genre: [String],
      description: String,
      director: String,
      cast: [String],
    },
    { strict: false }
  );

  const Model = mongoose.model(collection, MovieSchema);

  switch (command) {
    case "check-db-connection":
      await checkConnection();
      break;
    case "reset-db":
      await resetDatabase(Model);
      break;
    case "bulk-insert":
      await bulkInsert(Model);
      break;
    case "get-all":
      await getAllData(Model);
      break;
    default:
      throw Error("command not found");
  }

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB!");
}

async function checkConnection() {
  console.log("check db connection started...");
  try {
    await mongoose.connection.db.admin().ping();
    console.log("MongoDB connection is successful!");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
  console.log("check db connection ended...");
}

async function resetDatabase(Model) {
  console.log("reset started...");
  try {
    await Model.deleteMany();
    console.log("Database reset successful!");
  } catch (err) {
    console.error("MongoDB reset failed:", err);
  }
  console.log("reset ended...");
}

async function bulkInsert(Model) {
  console.log("Bulk insert started...");
  try {
    const data = fs.readFileSync("./seed.json");
    const parsed = JSON.parse(data);
    await Model.insertMany(parsed);
    console.log("Bulk insert successful! Inserted data count:", parsed.length);
  } catch (err) {
    console.error("MongoDB Bulk insert failed:", err);
  }
  console.log("Bulk insert ended...");
}

async function getAllData(Model) {
  console.log("Retrieved all data started...");
  try {
    const allData = await Model.find();
    console.log("Retrieved all data successfully! Data count:", allData.length);
    console.log(allData);
  } catch (err) {
    console.error("MongoDB Retrieved all data failed:", err);
  }
  console.log("Retrieved all data ended...");
}

main();
