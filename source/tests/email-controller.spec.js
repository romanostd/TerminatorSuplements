const request = require("supertest");
const app = require("../app");

describe("Email API", () => {
  it("should send a forgot password email", async () => {
    const email = "queijoromano@gmail.com";
    const code = "12345";

    const response = await request(app).get(
      `/email?email=${email}&code=${code}`,
    );

    expect(response.status).toBe(200);
    expect(response.body.accepted).toEqual([email]);
  }, 8000);
});
