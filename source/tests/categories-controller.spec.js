require('dotenv').config();
const request = require('supertest');
const app = require('../app');
let categoryId = null;

describe('GET /getCategories', () => {
  it('should return a list of categories', async () => {
    const response = await request(app).get('/categories'); 
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.length).toBeGreaterThan(0);
  });
});


describe('GET /getCategoryById/:category_id', () => {
  it('should return a specific category by ID', async () => {
    const categoryId = 1; 
    const response = await request(app).get(`/categories/${categoryId}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it('should handle non-existent category ID', async () => {
    const categoryId = 999;
    const response = await request(app).get(`/categories/${categoryId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

});

describe('POST /saveCategory', () => {
  it('should create a new category', async () => {
    const newCategory = { name: 'NewCategory' };
    const response = await request(app).post('/categories').send(newCategory);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Category created successfully');
    expect(response.body.category_id).toBeDefined();
    categoryId = response.body.category_id;
  });

  it('should handle server errors', async () => {
    const newCategory = { wrongProperty: 'NewCategory' }; 
    const response = await request(app).post('/categories').send(newCategory);
    expect(response.status).toBe(500);
    expect(response.body.error).toBeDefined();
  });
});

describe('PUT /updateCategory', () => {
  it('should update an existing category', async () => {

    const updatedCategory = { category_id: categoryId, name: 'UpdatedCategory' };
    const response = await request(app).put('/categories').send(updatedCategory);
    expect(response.status).toBe(202);
    expect(response.body.message).toBe('Category updated successfully');
  });

  it('should handle server errors', async () => { 
    const updatedCategory = { category_id: categoryId, wrongProperty: "wrongProperty" }; 
    const response = await request(app).put('/categories').send(updatedCategory);
    expect(response.status).toBe(500);
    expect(response.body.error).toBeDefined();
  });
});

describe('DELETE /deleteCategory/:category_id', () => {
  it('should delete a specific category by ID', async () => {

    const response = await request(app).delete(`/categories/${categoryId}`);
    expect(response.status).toBe(202);
    expect(response.body.message).toBe('Category removed successfully');
  });

  it('should handle non-existent category ID', async () => {
    const categoryId = 999; 
    const response = await request(app).delete(`/categories/${categoryId}`);
    expect(response.status).toBe(404); 
    expect(response.body.message).toBe('Category not found');
  });
});


