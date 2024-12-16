require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose")
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const adminsRouter = require("./routes/adminsRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/admins", adminsRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

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
