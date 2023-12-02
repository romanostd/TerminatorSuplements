const request = require("supertest");
const app = require("../app");

describe("Email API", () => {
  it("should send a forgot password email", async () => {
    const email = process.env.TERMINATOR_EMAIL;
    const code = process.env.TERMINATOR_KEY;

    const response = await request(app).get(
      `/email?email=${email}&code=${code}`,
    );
      console.log(response.body)
    expect(response.status).toBe(200);
    // expect(response.body.accepted).toEqual([email]);
  }, 15000);
});
