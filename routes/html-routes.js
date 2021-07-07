// Import express router and path
const router = require("express").Router();
const path = require("path");

// Create the GET request for the home page
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Create the GET request for the exercise page
router.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

// Create GET request for the Stats Page
router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/stats.html"));
});

// Export the HTML routes
module.exports = router;