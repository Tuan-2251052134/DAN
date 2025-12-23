jest.mock("../services/jobService");
jest.mock("../services/userService");
jest.mock("../services/typeService");
jest.mock("../services/applyService");

const request = require("supertest");
const express = require("express");
const { setRouter } = require("../routers/jobRouter");

let app;

beforeAll(() => {
  app = express();
  app.use(express.json());
  setRouter(app);
});

/**
 * token role BUSINESS
 */
const businessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZGlzdHJpY3RJZCI6MSwiYWRkcmVzcyI6IjcwIEjDoCBUw7RuIFF1eeG7gW4gIiwicm9sZSI6IkJVU0lORVNTIiwibmFtZSI6IlR1YW5CdXNpbmVzcyIsImVtYWlsIjoibHlnaWF0dWFuQnVzaW5lc3NAZ21haWwuY29tIiwiYXZhdGFyIjoiaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZHg2YnJjb2ZlL2ltYWdlL3VwbG9hZC92MTc2NDM1MzgxNi9jeGxwaWEwcm1hOHM0MWhwYXVsdC5qcGciLCJpYXQiOjE3NjY0NTgxMzN9.lynFx5xRTy479vPT7_6bux3zmL5KPRqxzsoBOGzbno0";

/**
 * token role ADMIN
 */
const adminToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZGlzdHJpY3RJZCI6MSwiYWRkcmVzcyI6IjcwIEjDoCBUw7RuIFF1eeG7gW4gIiwicm9sZSI6IkFETUlOIiwibmFtZSI6IlR1YW5BZG1pbiIsImVtYWlsIjoibHlnaWF0dWFuQWRtaW5AZ21haWwuY29tIiwiYXZhdGFyIjoiaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZHg2YnJjb2ZlL2ltYWdlL3VwbG9hZC92MTc2NDM0NzgwNC9qYnVpYmY4Nm1kbnNqbmF5MTF4ZS5qcGciLCJpYXQiOjE3NjYyOTQ4OTJ9.ARF0vsSj8_wHeI2-Uqxo_96mHCQ5oh3Njz94ijE5HA0";

describe("Job Router", () => {
  test("GET /api/job", async () => {
    const res = await request(app).get("/api/job");

    expect(res.status).toBe(200);
  });

  test("GET /api/job/:id", async () => {
    const res = await request(app).get("/api/job/1");

    expect(res.status).toBe(200);
  });

  test("POST /api/job (BUSINESS)", async () => {
    const res = await request(app)
      .post("/api/job")
      .set("Authorization", `Bearer ${businessToken}`)
      .send({
        name: "Job Test",
        description: "Mô tả công việc",
        payment: 1000,
        userId: 2,
        typeId: 1,
        expiredDate: "2026-01-01",
      });

    expect(res.status).toBe(201);
  });

  test("POST /api/job (ADMIN)", async () => {
    const res = await request(app)
      .post("/api/job")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Job Admin",
        description: "Admin tạo job",
        payment: 2000,
        userId: 2,
        typeId: 1,
        expiredDate: "2026-01-01",
      });

    expect(res.status).toBe(201);
  });

  test("PUT /api/job/:id (BUSINESS)", async () => {
    const today = new Date();
    const tenDaysLater = new Date(today);
    tenDaysLater.setDate(today.getDate() + 10);

    const res = await request(app)
      .put("/api/job/2")
      .set("Authorization", `Bearer ${businessToken}`)
      .send({
        id: 2,
        name: "Job 2",
        description: "Mô tả job 2",
        payment: 2000,
        userId: 2,
        typeId: 2,
        status: "WAIT",
        expiredDate: tenDaysLater,
      });

    expect(res.status).toBe(200);
  });

  test("PUT /api/job/:id (ADMIN)", async () => {
    const today = new Date();
    const tenDaysLater = new Date(today);
    tenDaysLater.setDate(today.getDate() + 10);

    const res = await request(app)
      .put("/api/job/2")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        id: 2,
        name: "Job 2",
        description: "Mô tả job 2",
        payment: 2000,
        userId: 2,
        typeId: 2,
        status: "PASS",
        expiredDate: tenDaysLater,
      });

    expect(res.status).toBe(200);
  });
});
