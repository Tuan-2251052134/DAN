jest.mock("../services/typeService");
jest.mock("../services/jobService");
jest.mock("../services/userService");

const request = require("supertest");
const express = require("express");
const { setRouter } = require("../routers/typeRouter");

let app;

beforeAll(() => {
  app = express();
  app.use(express.json());
  setRouter(app);
});

const adminToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZGlzdHJpY3RJZCI6MSwiYWRkcmVzcyI6IjcwIEjDoCBUw7RuIFF1eeG7gW4gIiwicm9sZSI6IkFETUlOIiwibmFtZSI6IlR1YW5BZG1pbiIsImVtYWlsIjoibHlnaWF0dWFuQWRtaW5AZ21haWwuY29tIiwiYXZhdGFyIjoiaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZHg2YnJjb2ZlL2ltYWdlL3VwbG9hZC92MTc2NDM0NzgwNC9qYnVpYmY4Nm1kbnNqbmF5MTF4ZS5qcGciLCJpYXQiOjE3NjYyOTQ4OTJ9.ARF0vsSj8_wHeI2-Uqxo_96mHCQ5oh3Njz94ijE5HA0";

describe("Type Router (service mocked)", () => {
  test("GET /api/type", async () => {
    const res = await request(app)
      .get("/api/type")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
  });

  test("GET /api/type/:id", async () => {
    const res = await request(app).get("/api/type/1");

    expect(res.status).toBe(200);
  });

  test("POST /api/type", async () => {
    const res = await request(app)
      .post("/api/type")
      .send({
        name: "Type Test",
      })
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.status).toBe(201);
  });

  test("PUT /api/type/:id", async () => {
    const res = await request(app)
      .put("/api/type/1")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        id: 1,
        name: "Type Update",
      });

    expect(res.status).toBe(200);
  });

  test("DELETE /api/type/:id", async () => {
    const res = await request(app)
      .delete("/api/type/1")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(400);
  });
});
