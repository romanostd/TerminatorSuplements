require("dotenv").config();
const request = require("supertest");
const app = require("../app");

describe("User Lifecycle with Login", () => {
  let createdUserId;
  it("should create a new user", async () => {
    const newUser = {
      name: "Test",
      email: "testuser@example.com",
      password: "password123",
      admin: true,
    };

    const response = await request(app).post("/users").send(newUser);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User created successfully");
    expect(response.body.user_id).toBeDefined();

    createdUserId = response.body.user_id;
  });
  it("should log in with the created user and delete the user", async () => {
    expect(createdUserId).toBeDefined();
    const userCredentials = {
      email: "testuser@example.com",
      password: "password123",
    };

    const loginResponse = await request(app)
      .post("/login")
      .send(userCredentials);

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body.message).toBe("Login success");
    expect(loginResponse.body.token).toBeDefined();
    expect(loginResponse.body.user_id).toBeDefined();
    expect(loginResponse.body.name).toBeDefined();
    expect(loginResponse.body.admin).toBeDefined();

    const deleteResponse = await request(app)
      .delete(`/users/${createdUserId}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(deleteResponse.status).toBe(202);
    expect(deleteResponse.body.message).toBe("User removed successfully");
  });
});
