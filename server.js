const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const movies = JSON.parse(
  fs.readFileSync(path.join(__dirname, "movies_metadata.json"))
);

// Test ping
app.get("/api/ping", (req, res) => {
  res.send("pong!");
});

// API: List all movies
app.get("/api/movies", (req, res) => {
  res.json(movies);
});

// API: Get a movie by ID
app.get("/api/movies/:id", (req, res) => {
  const movie = movies.find(m => m.id === req.params.id);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ error: "Movie not found" });
  }
});

// Serve frontend in production
let port;
if (process.env.NODE_ENV === "production") {
  port = process.env.PORT || 3000;
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
  });
} else {
  port = 3001;
}

const listener = app.listen(port, () => {
  console.log(`✅ Server running on port ${listener.address().port}`);
});