const express = require("express");
const mongoose = require("mongoose");
const app = express();

const pageRoute = require("./routes/pageRoutes");
const userData = require("./controllers/pageControllers");
// Connect DB
mongoose.connect("mongodb://localhost:27017/node-chat-app").then(() => {
  console.log("DB Connected Successfully.");
});

// Middlewares
app.use(express.json()); // for parsing application/json
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true"); // credentials ayarı
  next();
});

const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

const PORT = 3001;

app.use("/", pageRoute);

server.listen(PORT, () => {
  console.log("App Started on Port:", PORT);
});

io.on("connection", (socket) => {
  console.log("A user connected "+ socket.id);

  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`User with ID ${userId} joined`);
  });

  socket.on(`chat`, (data) => {
    io.sockets.emit("chat", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

module.exports = server;