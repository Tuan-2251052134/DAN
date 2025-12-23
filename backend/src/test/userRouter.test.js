jest.mock("../services/cityService");
jest.mock("../services/userService");
jest.mock("../services/districtService");
jest.mock("../utils/uploadFileUtil");

const request = require("supertest");
const express = require("express");
const { setRouter } = require("../routers/userRouter");
const errorConfig = require("../configs/errorConfig");

let app;

beforeAll(() => {
  app = express();
  app.use(express.json());
  setRouter(app);
  errorConfig.setConfig(app);
});

const adminToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZGlzdHJpY3RJZCI6MSwiYWRkcmVzcyI6IjcwIEjDoCBUw7RuIFF1eeG7gW4gIiwicm9sZSI6IkFETUlOIiwibmFtZSI6IlR1YW5BZG1pbiIsImVtYWlsIjoibHlnaWF0dWFuQWRtaW5AZ21haWwuY29tIiwiYXZhdGFyIjoiaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZHg2YnJjb2ZlL2ltYWdlL3VwbG9hZC92MTc2NDM0NzgwNC9qYnVpYmY4Nm1kbnNqbmF5MTF4ZS5qcGciLCJpYXQiOjE3NjYyOTQ4OTJ9.ARF0vsSj8_wHeI2-Uqxo_96mHCQ5oh3Njz94ijE5HA0";

const jobSeekerToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZGlzdHJpY3RJZCI6MSwiYWRkcmVzcyI6IjcwIEjDoCBUw7RuIFF1eeG7gW4iLCJyb2xlIjoiSk9CX1NFRUtFUiIsIm5hbWUiOiJUdWFuSm9ic2Vla2VyIiwiZW1haWwiOiJseWdpYXR1YW5Kb2JzZWVrZXJAZ21haWwuY29tIiwiYXZhdGFyIjoiaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZHg2YnJjb2ZlL2ltYWdlL3VwbG9hZC92MTc2NjIxMDQyMi9neHRva250cWRucmR3Z3JoM2xqeS5qcGciLCJpYXQiOjE3NjY0MTQ4MDR9.pTvKdmyoqHKFVPFdajtBD17w5uapqjPzoxZHV1st868";

describe("User Router (no mock)", () => {
  // ---------- AUTH ----------
  test("POST /api/user/login", async () => {
    const res = await request(app).post("/api/user/login").send({
      email: "lygiatuanAdmin@gmail.com",
      password: "Lkjhg09876!",
    });

    expect(res.status).toBe(200);
  });

  // ---------- REGISTER ----------
  test("POST /api/user (register)", async () => {
    const res = await request(app)
      .post("/api/user")
      .field("name", "Test User")
      .field("email", "test@gmail.com")
      .field("password", "123456")
      .field("role", "JOB_SEEKER")
      .field("districtId", 1)
      .field("address", "Test address")
      .attach("avatar", "/Users/tuan/Documents/Tuan/van.jpg");

    expect(res.status).toBe(201);
  });

  // ---------- ADMIN ----------
  test("GET /api/user ", async () => {
    const res = await request(app)
      .get("/api/user")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
  });

  test("GET /api/user/admin/:id", async () => {
    const res = await request(app)
      .get("/api/user/admin/1")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(200).toBe(res.status);
  });

  // ---------- PROFILE ----------
  test("GET /api/user/profile", async () => {
    const res = await request(app)
      .get("/api/user/profile")
      .set("Authorization", `Bearer ${jobSeekerToken}`);

    expect(200).toBe(res.status);
  });

  test("PUT /api/user/profile", async () => {
    const res = await request(app)
      .put("/api/user/profile")
      .set("Authorization", `Bearer ${jobSeekerToken}`)
      .field("id", 3)
      .field("name", "Test User")
      .field("email", "lygiatuanJobseeker@gmail.com")
      .field("password", "123456")
      .field("role", "JOB_SEEKER")
      .field("districtId", 3)
      .field("address", "Test address")
      .attach("avatar", "/Users/tuan/Documents/Tuan/van.jpg")
      .attach("cv", "/Users/tuan/Documents/Tuan/van.pdf");

    expect(200).toBe(res.status);
  });

  // ---------- ADMIN UPDATE ----------
  test("PUT /api/user/admin/:id", async () => {
    const res = await request(app)
      .put("/api/user/admin/3")
      .set("Authorization", `Bearer ${adminToken}`)
      .field("id", 3)
      .field("name", "Test User sfd")
      .field("email", "lygiatuanJobseeker@gmail.com")
      .field("password", "123456")
      .field("role", "JOB_SEEKER")
      .field("districtId", 3)
      .field("address", "Test address")
      .attach("avatar", "/Users/tuan/Documents/Tuan/van.jpg")
      .attach("cv", "/Users/tuan/Documents/Tuan/van.pdf");

    expect(200).toBe(res.status);
  });
});
