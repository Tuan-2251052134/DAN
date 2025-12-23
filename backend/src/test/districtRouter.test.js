jest.mock("../services/cityService");
jest.mock("../services/userService");
jest.mock("../services/districtService");

const request = require("supertest");
const express = require("express");
const { setRouter } = require("../routers/districtRouter");

let app;

beforeAll(() => {
  app = express();
  app.use(express.json());
  setRouter(app);
});

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZGlzdHJpY3RJZCI6MSwiYWRkcmVzcyI6IjcwIEjDoCBUw7RuIFF1eeG7gW4gIiwicm9sZSI6IkFETUlOIiwibmFtZSI6IlR1YW5BZG1pbiIsImVtYWlsIjoibHlnaWF0dWFuQWRtaW5AZ21haWwuY29tIiwiYXZhdGFyIjoiaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZHg2YnJjb2ZlL2ltYWdlL3VwbG9hZC92MTc2NDM0NzgwNC9qYnVpYmY4Nm1kbnNqbmF5MTF4ZS5qcGciLCJpYXQiOjE3NjYyOTQ4OTJ9.ARF0vsSj8_wHeI2-Uqxo_96mHCQ5oh3Njz94ijE5HA0";

describe("District Router (no mock)", () => {
  test("GET /api/district", async () => {
    const res = await request(app).get("/api/district");

    expect(res.status).toBe(200);
  });

  test("GET /api/district/:id", async () => {
    const res = await request(app).get("/api/district/1");

    expect(res.status).toBe(200);
  });

  test("POST /api/district", async () => {
    const res = await request(app)
      .post("/api/district")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Quận Test",
        cityId: 1,
      });

    expect(res.status).toBe(201);
  });

  test("PUT /api/district/:id", async () => {
    const res = await request(app)
      .put("/api/district/1")
      .set("Authorization", `Bearer ${token}`)
      .send({
        id: 1,
        name: "Quận Update",
        cityId: 1,
      });

    expect(res.status).toBe(200);
  });

  test("DELETE /api/district/:id", async () => {
    const res = await request(app)
      .delete("/api/district/1")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(204);
  });
});
