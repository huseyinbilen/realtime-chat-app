const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect("mongodb://localhost:27017/node-chat-app");
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("POST /register", () => {
  it("should create a user", async () => {
    const res = await request(app).post("/register").send({
      username: "user test",
      email: "user@test.com",
      password: "testpass"
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
  });
});