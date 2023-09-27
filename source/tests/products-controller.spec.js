require("dotenv").config();
const request = require("supertest");
const app = require("../app");
let productId = null;

describe("POST /saveProduct", () => {
  it("should create a new product", async () => {
    const newProduct = {
      name: "NewProduct",
      price: 9.99,
      description: "test",
      quantity: 5,
    };
    const response = await request(app).post("/products").send(newProduct);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Product created successfully");
    expect(response.body.product_id).toBeDefined();
    productId = response.body.product_id;
  });

  it("should handle server errors", async () => {
    const newProduct = { wrongProperty: "NewProduct" };
    const response = await request(app).post("/products").send(newProduct);
    expect(response.status).toBe(500);
    expect(response.body.error).toBeDefined();
  });
});

describe("GET /products", () => {
  it("should return a list of all products", async () => {
    const response = await request(app).get("/products");
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it("should return a specific product by name", async () => {
    const productName = "NewProduct";
    const response = await request(app).get(`/products?name=${productName}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe("GET /products/:product_id", () => {
  it("should return a specific product by ID", async () => {
    const response = await request(app).get(`/products/${productId}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it("should handle non-existent product ID", async () => {
    const productId = 999;
    const response = await request(app).get(`/products/${productId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});

describe("PUT /updateProduct", () => {
  it("should update an existing product", async () => {
    const updatedProduct = {
      product_id: productId,
      name: "updatedProduct",
      price: 9.99,
      description: "test",
      quantity: 6,
    };
    const response = await request(app).put("/products").send(updatedProduct);
    expect(response.status).toBe(202);
    expect(response.body.message).toBe("Product updated successfully");
  });

  it("should handle server errors", async () => {
    const updatedProduct = {
      product_id: productId,
      wrongProperty: "WrongProperty",
    };
    const response = await request(app).put("/products").send(updatedProduct);
    expect(response.status).toBe(500);
    expect(response.body.error).toBeDefined();
  });
});

describe("DELETE /products/:product_id", () => {
  it("should delete a specific product by ID", async () => {
    const response = await request(app).delete(`/products/${productId}`);
    expect(response.status).toBe(202);
    expect(response.body.message).toBe("Product removed successfully");
  });

  it("should handle non-existent product ID", async () => {
    const productId = 999;
    const response = await request(app).delete(`/products/${productId}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Product not found");
  });
});
