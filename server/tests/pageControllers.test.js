const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");

require("dotenv").config();

let token = "";

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect("mongodb://localhost:27017/node-chat-app");
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

afterAll((done) => {
  app.close(done);
});


describe("GET /", () => {
  it("should get Welcome Page", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
  });
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

describe("POST /login", () => {
  it("should login a user", async () => {
    const res = await request(app).post("/login").send({
      email: "user@test.com",
      password: "testpass"
    });
    token = res.body.data.token;
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});

describe("POST /friends/add", () => {
  it("should add a friend", async () => {
    const res = await request(app).post("/friends/add").set("Authorization", `Bearer ${token}`).send({
      friends: "64386224872f568254409a30"
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
  });
});

describe("POST /friends/remove", () => {
  it("should remove a friend", async () => {
    const res = await request(app).post("/friends/remove").set("Authorization", `Bearer ${token}`).send({
      friends: "64386224872f568254409a30"
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
  });
});
