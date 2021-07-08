// require express, mongoose, morgan; create mongoose database connection; create routes and listen request for port
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

const PORT = process.env.PORT || 3000;

// Create the express app
const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Create mongoose database connection, OR localhost connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitnesstracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// create the routes for api-routes.js and html-routes.js
app.use(require("./routes/api-routes.js"));
app.use(require("./routes/html-routes.js"));

// Listen to the request on a port
app.listen(PORT, () => {
  console.log(`Hi there, Buddy! The app is listening on port ${PORT}!`);
});