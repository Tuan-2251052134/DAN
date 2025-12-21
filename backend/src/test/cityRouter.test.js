jest.mock("../services/cityService");
jest.mock("../services/userService");
jest.mock("../services/districtService");

const request = require("supertest");
const express = require("express");
const { setRouter } = require("../routers/cityRouter");
const cityService = require("../services/cityService");

let app;
beforeEach(() => {
  process.env.CLOUDINARY_API_KEY = "716129595449135";
  process.env.CLOUDINARY_API_SECRET = "drKg8CvyTumADgnoKln06YGRfss";
  process.env.CLOUDINARY_CLOUD_NAME = "dx6brcofe";

  process.env.JWT_SECRET = "f9e9caae-e787-431f-913a-e3918b0cdb5a";
  process.env.QUERY_LIMIT = 10;
  app = express();
  app.use(express.json());
  setRouter(app);
});

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZGlzdHJpY3RJZCI6MSwiYWRkcmVzcyI6IjcwIEjDoCBUw7RuIFF1eeG7gW4gIiwicm9sZSI6IkFETUlOIiwibmFtZSI6IlR1YW5BZG1pbiIsImVtYWlsIjoibHlnaWF0dWFuQWRtaW5AZ21haWwuY29tIiwiYXZhdGFyIjoiaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZHg2YnJjb2ZlL2ltYWdlL3VwbG9hZC92MTc2NDM0NzgwNC9qYnVpYmY4Nm1kbnNqbmF5MTF4ZS5qcGciLCJpYXQiOjE3NjYyOTQ4OTJ9.ARF0vsSj8_wHeI2-Uqxo_96mHCQ5oh3Njz94ijE5HA0";

describe("City Router", () => {
  it("GET /api/city should return all cities", async () => {
    const res = await request(app).get("/api/city");
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(cityService.getAll).toHaveBeenCalled();
  });

  it("POST /api/city should create a city", async () => {
    const res = await request(app)
      .post("/api/city")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "New City" });

    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe("New City");
    expect(cityService.create).toHaveBeenCalled();
  });

  it("GET /api/city/:id should return a city", async () => {
    const res = await request(app).get("/api/city/1");
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(1);
    expect(cityService.getOne).toHaveBeenCalled();
  });

  it("PUT /api/city/:id should update a city", async () => {
    const res = await request(app)
      .put("/api/city/1")
      .set("Authorization", `Bearer ${token}`)
      .send({ id: 1, name: "Updated City" });
    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe("Updated City");
    expect(cityService.update).toHaveBeenCalled();
  });

  it("DELETE /api/city/:id should delete a city", async () => {
    const res = await request(app)
      .delete("/api/city/1")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(204);
    expect(cityService.deleteOne).toHaveBeenCalled();
  });
});
