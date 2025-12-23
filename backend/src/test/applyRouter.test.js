// __tests__/applyRouter.test.js
jest.mock("../services/userService");
jest.mock("../services/jobService");
jest.mock("../services/applyService");

const request = require("supertest");
const express = require("express");
const { setRouter } = require("../routers/applyRouter");

let app;

beforeAll(() => {

  app = express();
  app.use(express.json());
  setRouter(app);
});

// Token giả lập cho test (JWT payload tùy chỉnh)
const businessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZGlzdHJpY3RJZCI6MSwiYWRkcmVzcyI6IjcwIEjDoCBUw7RuIFF1eeG7gW4gIiwicm9sZSI6IkJVU0lORVNTIiwibmFtZSI6IlR1YW5CdXNpbmVzcyIsImVtYWlsIjoibHlnaWF0dWFuQnVzaW5lc3NAZ21haWwuY29tIiwiYXZhdGFyIjoiaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZHg2YnJjb2ZlL2ltYWdlL3VwbG9hZC92MTc2NDM1MzgxNi9jeGxwaWEwcm1hOHM0MWhwYXVsdC5qcGciLCJpYXQiOjE3NjY0NTgxMzN9.lynFx5xRTy479vPT7_6bux3zmL5KPRqxzsoBOGzbno0";

/**
 * token role ADMIN
 */
const adminToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZGlzdHJpY3RJZCI6MSwiYWRkcmVzcyI6IjcwIEjDoCBUw7RuIFF1eeG7gW4gIiwicm9sZSI6IkFETUlOIiwibmFtZSI6IlR1YW5BZG1pbiIsImVtYWlsIjoibHlnaWF0dWFuQWRtaW5AZ21haWwuY29tIiwiYXZhdGFyIjoiaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZHg2YnJjb2ZlL2ltYWdlL3VwbG9hZC92MTc2NDM0NzgwNC9qYnVpYmY4Nm1kbnNqbmF5MTF4ZS5qcGciLCJpYXQiOjE3NjYyOTQ4OTJ9.ARF0vsSj8_wHeI2-Uqxo_96mHCQ5oh3Njz94ijE5HA0";

const jobSeekerToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZGlzdHJpY3RJZCI6MSwiYWRkcmVzcyI6IjcwIEjDoCBUw7RuIFF1eeG7gW4iLCJyb2xlIjoiSk9CX1NFRUtFUiIsIm5hbWUiOiJUdWFuSm9ic2Vla2VyIiwiZW1haWwiOiJseWdpYXR1YW5Kb2JzZWVrZXJAZ21haWwuY29tIiwiYXZhdGFyIjoiaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZHg2YnJjb2ZlL2ltYWdlL3VwbG9hZC92MTc2NjIxMDQyMi9neHRva250cWRucmR3Z3JoM2xqeS5qcGciLCJpYXQiOjE3NjY0MTQ4MDR9.pTvKdmyoqHKFVPFdajtBD17w5uapqjPzoxZHV1st868";

describe("Apply Router", () => {
  test("POST /api/apply - create apply", async () => {
    const res = await request(app)
      .post("/api/apply")
      .set("Authorization", `Bearer ${jobSeekerToken}`)
      .send({
        userId: 3,
        jobId: 1,
      });

    expect(res.status).toBe(400);
  });

  test("GET /api/apply - get all applys", async () => {
    const res = await request(app)
      .get("/api/apply?jobId=1")
      .set("Authorization", `Bearer ${businessToken}`);

    expect(res.status).toBe(200);
  });

  test("GET /api/apply/:id - get apply by id", async () => {
    const res = await request(app)
      .get(`/api/apply/1`)
      .set("Authorization", `Bearer ${businessToken}`);

    expect(res.status).toBe(200);
  });

  test("PUT /api/apply/:id - update apply", async () => {
    const res = await request(app)
      .put(`/api/apply/1`)
      .set("Authorization", `Bearer ${businessToken}`)
      .send({
        id: 1,
        jobId: 1,
        jobSeekerId: 3,
        status: "PASS",
        createdDate: new Date("2025-12-23T10:30:00Z"),
      });

    expect(res.status).toBe(201);
  });

  test("DELETE /api/apply/:id - delete apply", async () => {
    const res = await request(app)
      .delete(`/api/apply/1`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(204);
  });
});
