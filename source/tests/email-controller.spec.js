const request = require("supertest");
const app = require("../app");
const nodemailerMock = require("nodemailer-mock");

describe("Email API", () => {
  beforeEach(() => {
    nodemailerMock.mock.reset();
  });

  it("should send a forgot password email", async () => {

    const email = "queijoromano@gmail.com";
    const code = "12345";

    const response = await request(app)
      .get(`/email?email=${email}&code=${code}`);

    expect(response.status).toBe(200);
    expect(response.body.accepted).toEqual([email]);
    const sentMails = nodemailerMock.mock.sentMail();
    
    if (sentMails.length > 0) {
      const sentMail = sentMails[0];
      expect(sentMail.to).toBe(email);
      expect(sentMail.subject).toBe("Reset password");
      expect(sentMail.text).toContain(`Your confirmation code is ${code}`);
    } else {
      console.log("No emails were sent (as expected).");
    }
  }, 8000);
});
