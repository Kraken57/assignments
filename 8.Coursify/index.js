require("dotenv").config();
const express = require("express");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const mongoose = require("mongoose");
const { loggerMiddleware } = require("./middleware/loggermiddleware");
const app = express();

app.use(express.json());

app.use(loggerMiddleware); // Use the logging middleware

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process if the database connection fails
  }

  app.listen(3000, () => {
    console.log("Server running at Port 3000");
  });
}

main();
