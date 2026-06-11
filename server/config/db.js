const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const isPlaceholderUri = (uri) => {
  if (!uri) return true;

  const placeholderPatterns = [
    "your_mongodb_url",
    "<db_password>",
    "<password>",
    "<username>",
    "your_username",
    "your_password",
    "username",
    "password",
  ];

  return placeholderPatterns.some((pattern) => uri.includes(pattern));
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