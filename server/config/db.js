const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const isPlaceholderUri = (uri) => {
  return (
    !uri ||
    uri.includes("your_mongodb_url") ||
    uri.includes("username") ||
    uri.includes("password") ||
    uri.includes("cluster0.mongodb.net")
  );
};

const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI;

    if (isPlaceholderUri(uri)) {
      const memoryServer = await MongoMemoryServer.create();
      uri = memoryServer.getUri();
      console.log("Using in-memory MongoDB for development because MONGO_URI is not configured.");
    }

    await mongoose.connect(uri);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;