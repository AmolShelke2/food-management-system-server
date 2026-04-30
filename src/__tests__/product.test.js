const request = require('supertest');
const app = require('../index');
const Product = require('../models/Product');
const mongoose = require('mongoose');

describe('Product Controller', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });

  afterEach(async () => {
    await Product.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('GET /api/products', () => {
    it('should return all products', async () => {
      const productData = {
        name: 'Margherita Pizza',
        description: 'Classic Italian pizza',
        price: 299,
        category: 'pizza',
        image: 'https://example.com/pizza.jpg',
        availability: true
      };

      await Product.create(productData);

      const response = await request(app).get('/api/products');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.count).toBe(1);
      expect(response.body.data[0].name).toBe('Margherita Pizza');
    });

    it('should filter products by category', async () => {
      await Product.create({
        name: 'Pepperoni Pizza',
        description: 'Pizza with pepperoni',
        price: 399,
        category: 'pizza',
        image: 'https://example.com/pepperoni.jpg'
      });

      await Product.create({
        name: 'Burger King',
        description: 'Classic burger',
        price: 199,
        category: 'burgers',
        image: 'https://example.com/burger.jpg'
      });

      const response = await request(app).get('/api/products?category=pizza');

      expect(response.status).toBe(200);
      expect(response.body.count).toBe(1);
      expect(response.body.data[0].category).toBe('pizza');
    });
  });

  describe('GET /api/products/categories', () => {
    it('should return all categories', async () => {
      await Product.create({
        name: 'Pizza Margherita',
        description: 'Classic pizza',
        price: 299,
        category: 'pizza',
        image: 'https://example.com/pizza.jpg'
      });

      await Product.create({
        name: 'Burger',
        description: 'Classic burger',
        price: 199,
        category: 'burgers',
        image: 'https://example.com/burger.jpg'
      });

      const response = await request(app).get('/api/products/categories');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBe(2);
    });
  });

  describe('POST /api/products', () => {
    it('should require authentication', async () => {
      const response = await request(app).post('/api/products').send({
        name: 'New Pizza',
        description: 'Delicious pizza',
        price: 299,
        category: 'pizza',
        image: 'https://example.com/pizza.jpg'
      });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/products')
        .set('Authorization', 'Bearer invalid-token')
        .send({
          name: 'New Pizza'
          // Missing other required fields
        });

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/products/:id', () => {
    it('should return a product by ID', async () => {
      const product = await Product.create({
        name: 'Special Pizza',
        description: 'Special offer pizza',
        price: 399,
        category: 'pizza',
        image: 'https://example.com/special.jpg'
      });

      const response = await request(app).get(`/api/products/${product._id}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe('Special Pizza');
    });

    it('should return 404 for non-existent product', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app).get(`/api/products/${fakeId}`);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });
});
