// Import npm packages
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080; // Deployment Step 1

const routes = require("./routes/api");

// Deployment Step 2: Connet to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mern", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Verify that Mongoose is connected
mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!!!");
});

// Data Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Deployment Step 3 - import build directory into server
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// HTTP request logger
app.use(morgan("tiny"));
app.use("/api", routes);

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
