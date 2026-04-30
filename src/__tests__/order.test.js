const request = require('supertest');
const app = require('../index');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Admin = require('../models/Admin');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

describe('Order Controller', () => {
  let adminToken;
  let productId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });

  beforeEach(async () => {
    // Create a test product
    const product = await Product.create({
      name: 'Test Pizza',
      description: 'Test pizza for orders',
      price: 299,
      category: 'pizza',
      image: 'https://example.com/test-pizza.jpg'
    });
    productId = product._id;

    // Create admin token
    const admin = await Admin.create({
      email: 'admin@test.com',
      password: 'password123'
    });
    adminToken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
  });

  afterEach(async () => {
    await Order.deleteMany({});
    await Product.deleteMany({});
    await Admin.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('POST /api/orders', () => {
    it('should create an order with valid data', async () => {
      const orderData = {
        items: [
          {
            productId,
            quantity: 2
          }
        ],
        customer: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '9876543210',
          address: '123 Main St, City'
        }
      };

      const response = await request(app)
        .post('/api/orders')
        .send(orderData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.orderNumber).toBeDefined();
      expect(response.body.data.totalPrice).toBe(598); // 299 * 2
      expect(response.body.data.status).toBe('pending');
    });

    it('should validate required customer fields', async () => {
      const orderData = {
        items: [{ productId, quantity: 1 }],
        customer: {
          name: 'John Doe'
          // Missing email, phone, address
        }
      };

      const response = await request(app)
        .post('/api/orders')
        .send(orderData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('should validate email format', async () => {
      const orderData = {
        items: [{ productId, quantity: 1 }],
        customer: {
          name: 'John Doe',
          email: 'invalid-email',
          phone: '9876543210',
          address: '123 Main St'
        }
      };

      const response = await request(app)
        .post('/api/orders')
        .send(orderData);

      expect(response.status).toBe(400);
    });

    it('should validate phone number format', async () => {
      const orderData = {
        items: [{ productId, quantity: 1 }],
        customer: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '123', // Invalid
          address: '123 Main St'
        }
      };

      const response = await request(app)
        .post('/api/orders')
        .send(orderData);

      expect(response.status).toBe(400);
    });

    it('should reject order with non-existent product', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const orderData = {
        items: [{ productId: fakeId, quantity: 1 }],
        customer: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '9876543210',
          address: '123 Main St'
        }
      };

      const response = await request(app)
        .post('/api/orders')
        .send(orderData);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });

    it('should reject order with unavailable product', async () => {
      // Create unavailable product
      const unavailableProduct = await Product.create({
        name: 'Unavailable Pizza',
        description: 'Not available',
        price: 299,
        category: 'pizza',
        image: 'https://example.com/unavailable.jpg',
        availability: false
      });

      const orderData = {
        items: [{ productId: unavailableProduct._id, quantity: 1 }],
        customer: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '9876543210',
          address: '123 Main St'
        }
      };

      const response = await request(app)
        .post('/api/orders')
        .send(orderData);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('not available');
    });
  });

  describe('GET /api/orders/:id', () => {
    it('should get order by ID', async () => {
      const order = await Order.create({
        items: [
          {
            productId,
            name: 'Test Pizza',
            price: 299,
            quantity: 1,
            subtotal: 299
          }
        ],
        customer: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '9876543210',
          address: '123 Main St'
        },
        totalPrice: 299
      });

      const response = await request(app).get(`/api/orders/${order._id}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data._id.toString()).toBe(order._id.toString());
    });

    it('should return 404 for non-existent order', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app).get(`/api/orders/${fakeId}`);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/orders (Admin only)', () => {
    it('should require authentication', async () => {
      const response = await request(app).get('/api/orders');

      expect(response.status).toBe(401);
    });

    it('should return all orders with valid token', async () => {
      await Order.create({
        items: [
          {
            productId,
            name: 'Test Pizza',
            price: 299,
            quantity: 1,
            subtotal: 299
          }
        ],
        customer: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '9876543210',
          address: '123 Main St'
        },
        totalPrice: 299
      });

      const response = await request(app)
        .get('/api/orders')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.count).toBe(1);
    });
  });

  describe('PATCH /api/orders/:id/status (Admin only)', () => {
    it('should update order status with valid token', async () => {
      const order = await Order.create({
        items: [
          {
            productId,
            name: 'Test Pizza',
            price: 299,
            quantity: 1,
            subtotal: 299
          }
        ],
        customer: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '9876543210',
          address: '123 Main St'
        },
        totalPrice: 299
      });

      const response = await request(app)
        .patch(`/api/orders/${order._id}/status`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'confirmed' });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.status).toBe('confirmed');
    });

    it('should reject invalid status', async () => {
      const order = await Order.create({
        items: [
          {
            productId,
            name: 'Test Pizza',
            price: 299,
            quantity: 1,
            subtotal: 299
          }
        ],
        customer: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '9876543210',
          address: '123 Main St'
        },
        totalPrice: 299
      });

      const response = await request(app)
        .patch(`/api/orders/${order._id}/status`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'invalid_status' });

      expect(response.status).toBe(400);
    });

    it('should require authentication', async () => {
      const order = await Order.create({
        items: [
          {
            productId,
            name: 'Test Pizza',
            price: 299,
            quantity: 1,
            subtotal: 299
          }
        ],
        customer: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '9876543210',
          address: '123 Main St'
        },
        totalPrice: 299
      });

      const response = await request(app)
        .patch(`/api/orders/${order._id}/status`)
        .send({ status: 'confirmed' });

      expect(response.status).toBe(401);
    });
  });
});
