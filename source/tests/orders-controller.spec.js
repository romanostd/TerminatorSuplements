require("dotenv").config();
const request = require("supertest");
const app = require("../app");
let orderId = null;

describe("Order API Endpoints", () => {
  describe("POST /orders", () => {
    it("should create a new order", async () => {
      const newOrder = {
        product_id: 5,
        quantity: 2,
      };

      const response = await request(app).post("/orders").send(newOrder);
      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Order created successfully");
      expect(response.body.order_id).toBeDefined();
      orderId = response.body.order_id;
    });

    it("should handle server errors", async () => {
      const invalidOrder = { wrongProperty: "InvalidOrder" };
      const response = await request(app).post("/orders").send(invalidOrder);
      expect(response.status).toBe(500);
      expect(response.body.error).toBeDefined();
    });
  });

  describe("GET /orders", () => {
    it("should return a list of all orders", async () => {
      const response = await request(app).get("/orders");
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });
  });

  describe("GET /orders/:order_id", () => {
    it("should return a specific order by ID", async () => {
      const response = await request(app).get(`/orders/${orderId}`);
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });
  });

  describe("PUT /updateOrder", () => {
    it("should update an existing order", async () => {
      const updatedOrder = {
        order_id: orderId,
        product_id: 5,
        quantity: 3,
      };

      const response = await request(app).put("/orders").send(updatedOrder);
      expect(response.status).toBe(202);
      expect(response.body.message).toBe("Order updated successfully");
    });

    it("should handle server errors", async () => {
      const invalidUpdatedOrder = {
        order_id: orderId,
        wrongProperty: "WrongProperty",
      };

      const response = await request(app)
        .put("/orders")
        .send(invalidUpdatedOrder);
      expect(response.status).toBe(500);
      expect(response.body.error).toBeDefined();
    });
  });

  describe("DELETE /orders/:order_id", () => {
    it("should delete a specific order by ID", async () => {
      const response = await request(app).delete(`/orders/${orderId}`);
      expect(response.status).toBe(202);
      expect(response.body.message).toBe("Order removed successfully");
    });

    it("should handle non-existent order ID", async () => {
      const nonExistentOrderId = 999;
      const response = await request(app).delete(
        `/orders/${nonExistentOrderId}`,
      );
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Order not found");
    });
  });
});
