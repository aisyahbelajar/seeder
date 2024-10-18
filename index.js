const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://aisyahlailia:aisyahblajar@aisyah.lpjvo.mongodb.net/vocasia-movie?retryWrites=true&w=majority&appName=aisyah"
);
const fs = require("fs");
require("dotenv").config();
const { title } = require("process");

async function main() {
  /**--------------- Not allowed to be edited - start - --------------------- */
  const mongoUri = process.env.MONGODB_URI;
  const collection = process.env.MONGODB_COLLECTION;

  const args = process.argv.slice(2);

  const command = args[0];
  /**--------------- Not allowed to be edited - end - --------------------- */

  // Connect to MongoDB
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Define a schema for the collection
  const schema = new mongoose.Schema(
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
  const Model = mongoose.model(collection, schema);

  switch (command) {
    case "check-db-connection":
      await checkConnection();
      break;
    case "reset-db":
      await MovieModel.deleteMany();
      break;
    case "bulk-insert":
      const data = fs.readFileSync("./config.json");
      const parsed = JSON.parse(data);
      await MovieModel.insertMany(parsed);
      break;
    // TODO: Buat logic fungsionalitas yg belum tersedia di bawah
    default:
      throw Error("command not found");
  }

  await mongoose.disconnect();
  return;
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

main();
