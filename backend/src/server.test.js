const app = require("./server");
const request = require("supertest");

describe("Test Express routes", () => {
  it("GET city", async () => {
    const res = await request(app).get("/api/city");
 
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Hello World");
  });

  //   it("POST /echo should return posted data", async () => {
  //     const data = { name: "Alice" };
  //     const res = await request(app).post("/echo").send(data);
  //     expect(res.statusCode).toBe(200);
  //     expect(res.body.data).toEqual(data);
  //   });
});
