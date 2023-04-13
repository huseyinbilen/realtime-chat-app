const express = require("express");
const mongoose = require("mongoose");

const app = express();

const pageRoute = require("./routes/pageRoutes");

// Connect DB
mongoose
  .connect("mongodb://localhost:27017/node-chat-app")
  .then(() => {
    console.log("DB Connected Successfully.");
  });

// Middlewares
app.use(express.json()); // for parsing application/json

const PORT = 3000;

app.use("/", pageRoute);

app.listen(3000, () => {
  console.log("App Started on Port:", PORT);
});
