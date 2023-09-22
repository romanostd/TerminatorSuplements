require('dotenv').config();
const request = require('supertest');
const app = require('../app');
let userId = null;

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const newUser = {
        name: 'NewUser',
        email: 'newuser@example.com',
        password: 'testpassword',
        admin: true,
      };

      const response = await request(app).post('/users').send(newUser);
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User created successfully');
      expect(response.body.user_id).toBeDefined();
      userId = response.body.user_id; 
    });

    it('should handle server errors', async () => {
      const invalidUser = { wrongProperty: 'InvalidUser' }; 
      const response = await request(app).post('/users').send(invalidUser);
      expect(response.status).toBe(500);
      expect(response.body.error).toBeDefined();
    });
  });

  describe('GET /users', () => {
    it('should return a list of all users', async () => {
      const response = await request(app).get('/users');
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });
  });

  describe('GET /users/:user_id', () => {
    it('should return a specific user by ID', async () => {
      const response = await request(app).get(`/users/${userId}`);
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it('should handle non-existent user ID', async () => {
      const nonExistentUserId = 999;
      const response = await request(app).get(`/users/${nonExistentUserId}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe('PUT /updateUser', () => {
    it('should update an existing user', async () => {
      const updatedUser = {
        user_id: userId,
        name: 'UpdatedUser',
        email: 'updateduser@example.com',
        password: 'updatedpassword',
        admin: false,
      };

      const response = await request(app).put('/users').send(updatedUser);
      expect(response.status).toBe(202);
      expect(response.body.result).toBeDefined();
    });

    it('should handle server errors', async () => {
      const invalidUpdatedUser = {
        user_id: userId,
        wrongProperty: 'WrongProperty',
      };

      const response = await request(app).put('/users').send(invalidUpdatedUser);
      expect(response.status).toBe(500);
      expect(response.body.error).toBeDefined();
    });
  });


  describe('DELETE /users/:user_id', () => {
    it('should delete a specific user by ID', async () => {
      const response = await request(app).delete(`/users/${userId}`);
      expect(response.status).toBe(202);
      expect(response.body.message).toBe('User removed successfully');
    });

    it('should handle non-existent user ID', async () => {
      const nonExistentUserId = 999;
      const response = await request(app).delete(`/users/${nonExistentUserId}`);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('User not found');
    });
  });
;
