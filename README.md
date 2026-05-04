# FoodieHub - Backend API

A robust REST API for food delivery platform built with Node.js, Express, MongoDB, and JWT authentication. Includes comprehensive testing, validation, and error handling.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [Database Setup](#database-setup)
- [API Documentation](#api-documentation)
- [Database Models](#database-models)
- [Error Handling](#error-handling)
- [Testing](#testing)
- [Security](#security)
- [Performance](#performance)
- [Troubleshooting](#troubleshooting)
- [Deployment](#deployment)

## ✨ Features

### Authentication & Authorization
- 🔐 **JWT Authentication** - Secure token-based authentication
- 🛡️ **Protected Routes** - Admin-only endpoints with middleware
- 🔑 **Password Hashing** - bcryptjs for secure passwords
- 📋 **Role-based Access** - Admin vs customer permissions

### Product Management
- 📦 **CRUD Operations** - Create, read, update, delete products
- 🏷️ **Categories** - Pizza, Burgers, Chicken, Desserts, Beverages
- 🖼️ **Product Details** - Name, description, price, image, availability
- ⏱️ **Preparation Time** - Configurable cooking time per item
- 🔍 **Filtering** - Filter by category, search functionality

### Order Management
- 📝 **Order Creation** - Multi-item orders with validation
- 📊 **Order Tracking** - Real-time status updates
- 🔄 **Status Updates** - 5 status stages (pending → delivered)
- 💰 **Price Calculation** - Automatic subtotal and total computation
- 📍 **Delivery Details** - Customer info with validation
- 📈 **Order Statistics** - Revenue, completion rates, metrics

### Validation & Security
- ✅ **Input Validation** - express-validator on all endpoints
- 📧 **Email Validation** - RFC-compliant email format
- 📞 **Phone Validation** - 10-digit phone numbers
- 💵 **Price Validation** - Positive numbers only
- 🚫 **XSS Protection** - Helmet.js headers
- 🔄 **CORS** - Configured cross-origin requests

### Testing
- 🧪 **Jest Testing** - 35+ test cases
- 📊 **Test Coverage** - 80%+ code coverage
- 🔬 **Unit Tests** - Controllers and models
- 🔗 **Integration Tests** - API endpoint testing
- 📈 **Coverage Reports** - Detailed coverage metrics

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | 14+ | JavaScript Runtime |
| Express.js | 4.18.2 | Web Framework |
| MongoDB | 4.4+ | NoSQL Database |
| Mongoose | 7.5.0 | ODM |
| JWT | 9.0.2 | Authentication |
| bcryptjs | 2.4.3 | Password Hashing |
| Express-validator | 7.0.0 | Input Validation |
| Helmet | 7.0.0 | Security Headers |
| Jest | 29.7.0 | Testing Framework |
| Supertest | 6.3.3 | HTTP Testing |

## 📁 Project Structure

```
apps/backend/
├── src/
│   ├── config/
│   │   └── database.js                 # MongoDB connection setup
│   │
│   ├── models/
│   │   ├── Product.js                  # Product schema
│   │   ├── Order.js                    # Order schema
│   │   └── Admin.js                    # Admin user schema
│   │
│   ├── controllers/
│   │   ├── productController.js        # Product CRUD logic
│   │   ├── orderController.js          # Order logic & status updates
│   │   └── authController.js           # Admin authentication
│   │
│   ├── routes/
│   │   ├── products.js                 # /api/products endpoints
│   │   ├── orders.js                   # /api/orders endpoints
│   │   └── auth.js                     # /api/auth endpoints
│   │
│   ├── middleware/
│   │   ├── auth.js                     # JWT verification middleware
│   │   └── errorHandler.js             # Global error handler
│   │
│   ├── __tests__/
│   │   ├── setup.js                    # Jest configuration
│   │   ├── product.test.js             # Product tests (15 cases)
│   │   └── order.test.js               # Order tests (20+ cases)
│   │
│   └── index.js                        # Express server entry point
│
├── seed.js                             # Database seeding script
├── package.json                        # Dependencies & scripts
├── jest.config.js                      # Jest configuration
├── .env.example                        # Environment template
└── .gitignore                          # Git ignore rules
```

## 🚀 Installation

### Prerequisites
- Node.js v14 or higher
- npm v6 or higher
- MongoDB (local or Atlas)

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd food-delivery-app/apps/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   ```

4. **Edit .env file**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/food-delivery
   JWT_SECRET=your_secret_key_here
   ADMIN_EMAIL=foodie@email.com
   ADMIN_PASSWORD=foodie123
   NODE_ENV=development
   ```

## 🔧 Environment Setup

### Development
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/food-delivery
JWT_SECRET=dev-secret-key
ADMIN_EMAIL=foodie@email.com
ADMIN_PASSWORD=foodie123
NODE_ENV=development
```

### Production
```env
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/food-delivery
JWT_SECRET=very-long-random-secret-key-minimum-32-chars
ADMIN_EMAIL=foodie@email.com
ADMIN_PASSWORD=secure-password
NODE_ENV=production
```

## ▶️ Running the Application

### Development Mode
```bash
npm run dev
```
- Runs with nodemon (auto-restart on file changes)
- Listens on http://localhost:5000

### Production Mode
```bash
npm start
```
- Runs without auto-restart
- Listens on configured PORT

### Run Tests
```bash
npm run test
```
- Runs all test suites
- Shows coverage report

### Watch Mode Testing
```bash
npm run test:watch
```
- Automatically re-runs tests on file changes
- Useful during development

## 💾 Database Setup

### MongoDB Local Installation

**macOS (with Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Windows:**
Download and install from [mongodb.com](https://www.mongodb.com/try/download/community)

**Linux (Ubuntu):**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
sudo apt-get install mongodb-org
sudo systemctl start mongod
```

### MongoDB Atlas (Cloud)

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Create database user
4. Get connection string
5. Update `MONGODB_URI` in `.env`

## 🌱 Seeding Database

Initialize database with sample data:

```bash
npm run seed
```

This creates:
- 15 sample products (5 categories × 3 items each)
- Admin user: `foodie@email.com` / `foodie123`

**Sample Products:**
- Pizza: Margherita, Pepperoni, Vegetarian
- Burgers: Classic, Bacon, Double Deluxe
- Chicken: Spicy Drumsticks, Grilled Legs, Wings Box
- Desserts: Chocolate Cake, Cheesecake, Ice Cream Sundae
- Beverages: Orange Juice, Iced Coffee, Smoothie Bowl

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Response Format
All endpoints return JSON in this format:
```json
{
  "success": true,
  "data": {},
  "message": "Success message",
  "count": 10
}
```

### Health Check
```
GET /api/health

Response:
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

## 🔑 Authentication

### Admin Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "foodie@email.com",
  "password": "foodie123"
}

Response (201):
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "admin": {
    "id": "user_id_here",
    "email": "foodie@email.com"
  }
}
```

### Admin Registration
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123"
}

Response (201):
{
  "success": true,
  "data": {
    "id": "user_id",
    "email": "admin@example.com"
  }
}
```

### Verify Token
```
GET /api/auth/verify
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "admin": {
    "id": "user_id"
  }
}
```

---

## 📦 Products

### Get All Products
```
GET /api/products
GET /api/products?category=pizza

Response (200):
{
  "success": true,
  "count": 15,
  "data": [
    {
      "_id": "id",
      "name": "Margherita Pizza",
      "description": "Classic Italian pizza",
      "price": 299,
      "category": "pizza",
      "image": "https://...",
      "availability": true,
      "preparationTime": 20,
      "createdAt": "2024-01-15T...",
      "updatedAt": "2024-01-15T..."
    }
  ]
}
```

### Get Product by ID
```
GET /api/products/:id

Response (200):
{
  "success": true,
  "data": { /* product object */ }
}
```

### Get All Categories
```
GET /api/products/categories

Response (200):
{
  "success": true,
  "data": [
    {
      "name": "pizza",
      "displayName": "Pizza",
      "count": 3
    }
  ]
}
```

### Create Product (Admin)
```
POST /api/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "New Pizza",
  "description": "Fresh homemade pizza",
  "price": 399,
  "category": "pizza",
  "image": "https://...",
  "availability": true,
  "preparationTime": 25
}

Response (201):
{
  "success": true,
  "message": "Product created successfully",
  "data": { /* product object */ }
}
```

### Update Product (Admin)
```
PUT /api/products/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Pizza",
  "price": 449
}

Response (200):
{
  "success": true,
  "message": "Product updated successfully",
  "data": { /* updated product */ }
}
```

### Delete Product (Admin)
```
DELETE /api/products/:id
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

## 📋 Orders

### Create Order
```
POST /api/orders
Content-Type: application/json

{
  "items": [
    {
      "productId": "product_id",
      "quantity": 2
    }
  ],
  "customer": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "address": "123 Main St, City"
  }
}

Response (201):
{
  "success": true,
  "message": "Order placed successfully",
  "data": {
    "_id": "order_id",
    "orderNumber": "ORD-1704067200000-1",
    "items": [
      {
        "productId": "id",
        "name": "Pizza",
        "price": 299,
        "quantity": 2,
        "subtotal": 598
      }
    ],
    "customer": { /* customer info */ },
    "totalPrice": 598,
    "status": "pending",
    "estimatedDeliveryTime": "2024-01-15T11:15:00Z",
    "createdAt": "2024-01-15T..."
  }
}
```

### Get Order by ID
```
GET /api/orders/:id

Response (200):
{
  "success": true,
  "data": { /* order object */ }
}
```

### Get All Orders (Admin)
```
GET /api/orders
Authorization: Bearer <token>
GET /api/orders?status=pending

Response (200):
{
  "success": true,
  "count": 5,
  "data": [ /* orders array */ ]
}
```

### Update Order Status (Admin)
```
PATCH /api/orders/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "confirmed"
}

Valid statuses:
- pending
- confirmed
- preparing
- out_for_delivery
- delivered
- cancelled

Response (200):
{
  "success": true,
  "message": "Order status updated successfully",
  "data": { /* updated order */ }
}
```

### Get Order Statistics (Admin)
```
GET /api/orders/stats/overview
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {
    "totalOrders": 156,
    "pendingOrders": 12,
    "deliveredOrders": 140,
    "totalRevenue": 45230
  }
}
```

---

## 🗄️ Database Models

### Product Model
```javascript
{
  name: String (required, max 100),
  description: String (required, max 500),
  price: Number (required, min 0),
  category: String (enum: ['pizza', 'burgers', 'chicken', 'desserts', 'beverages']),
  image: String (required),
  availability: Boolean (default: true),
  preparationTime: Number (in minutes, default: 20),
  createdAt: Date,
  updatedAt: Date
}
```

### Order Model
```javascript
{
  orderNumber: String (unique, auto-generated),
  items: [
    {
      productId: ObjectId (ref: Product),
      name: String,
      price: Number,
      quantity: Number,
      subtotal: Number
    }
  ],
  customer: {
    name: String (required),
    email: String (required, email format),
    phone: String (required, 10 digits),
    address: String (required)
  },
  totalPrice: Number (required),
  status: String (enum: ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled']),
  estimatedDeliveryTime: Date,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Admin Model
```javascript
{
  email: String (required, unique, lowercase),
  password: String (required, hashed with bcrypt),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test -- --coverage
```

### Test Files
- `src/__tests__/product.test.js` - 15 product tests
- `src/__tests__/order.test.js` - 20+ order tests

### Test Coverage
- Products: CRUD, filtering, validation
- Orders: Creation, validation, status updates
- Auth: Login, token verification
- Validation: Email, phone, prices
- Error: 404s, validation errors

### Example Test
```javascript
describe('POST /api/products', () => {
  it('should create product with valid data', async () => {
    const response = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'New Pizza',
        description: 'Test pizza',
        price: 299,
        category: 'pizza',
        image: 'https://...'
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe('New Pizza');
  });
});
```

---

## 🔐 Security

### Features Implemented
- ✅ JWT token authentication
- ✅ Password hashing (bcryptjs)
- ✅ Input validation (express-validator)
- ✅ CORS configuration
- ✅ Helmet.js security headers
- ✅ Error messages without exposing details

### Best Practices
1. Always use HTTPS in production
2. Keep JWT secret very long and random
3. Validate all user inputs
4. Hash passwords with bcryptjs (salt rounds: 10)
5. Use CORS for specific origins
6. Enable rate limiting in production
7. Set secure cookie flags
8. Implement CSRF protection if needed

---

## ⚡ Performance

### Optimizations
- Database indexing on frequently queried fields
- Lean queries to reduce data transfer
- Connection pooling with MongoDB
- Gzip compression ready
- Error handling to prevent crashes

### Response Times (Target)
- GET endpoints: < 100ms
- POST endpoints: < 200ms
- Complex queries: < 500ms

---

## 📜 Available Scripts

```bash
npm run dev           # Start with nodemon (development)
npm start             # Start production server
npm run test          # Run all tests
npm run test:watch    # Run tests in watch mode
npm run seed          # Initialize database
npm run lint          # Run ESLint (if configured)
```

---

## 🔧 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017

Solution:
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- For Atlas, verify IP whitelist
```

### JWT Token Expired
```
Error: TokenExpiredError

Solution:
- User should login again
- Token expires after 7 days
- Frontend should handle token refresh
```

### Validation Error
```
Error: ["Path `email` is required"]

Solution:
- Verify all required fields are sent
- Check field format (email, phone)
- Review validation rules in routes
```

### Port Already in Use
```
Error: listen EADDRINUSE :::5000

Solution:
- Change PORT in .env
- Kill process using port 5000
- Use: lsof -i :5000 (macOS/Linux)
```

### Database Seed Fails
```
Solution:
- Clear existing data: db.admins.deleteMany({})
- Verify MongoDB connection
- Check seed.js file syntax
- Run: npm run seed again
```

---

## 🚀 Deployment

### Heroku
```bash
heroku create foodie-api
heroku config:set MONGODB_URI=mongodb+srv://...
heroku config:set JWT_SECRET=your-secret-key
git push heroku main
```

### Railway
1. Connect GitHub account
2. Select repository
3. Add MongoDB add-on
4. Set environment variables
5. Deploy!

### AWS EC2
1. Launch Ubuntu instance
2. Install Node.js and MongoDB
3. Clone repository
4. npm install && npm start
5. Set up Nginx reverse proxy

### DigitalOcean
1. Create Droplet (Ubuntu)
2. SSH into droplet
3. Install dependencies
4. Deploy application
5. Set up process manager (PM2)

---

## 📊 API Endpoints Summary

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | /api/auth/login | No | Admin login |
| POST | /api/auth/register | No | Admin registration |
| GET | /api/auth/verify | Yes | Verify token |
| GET | /api/products | No | Get all products |
| GET | /api/products/:id | No | Get product |
| GET | /api/products/categories | No | Get categories |
| POST | /api/products | Yes | Create product |
| PUT | /api/products/:id | Yes | Update product |
| DELETE | /api/products/:id | Yes | Delete product |
| POST | /api/orders | No | Create order |
| GET | /api/orders/:id | No | Get order |
| GET | /api/orders | Yes | Get all orders |
| PATCH | /api/orders/:id/status | Yes | Update status |
| GET | /api/orders/stats/overview | Yes | Get stats |

---

## 🎓 Learning Resources

- [Express.js Docs](https://expressjs.com)
- [Mongoose Guide](https://mongoosejs.com)
- [JWT Auth](https://jwt.io)
- [Jest Testing](https://jestjs.io)
- [MongoDB Docs](https://docs.mongodb.com)

---

## 📝 Code Quality

- ✅ ESLint configured
- ✅ Code comments
- ✅ Error handling
- ✅ Input validation
- ✅ Consistent naming
- ✅ Modular structure

---

## 📄 License

MIT License - Free to use and modify

---

## 🎉 Getting Started

```bash
# 1. Install
npm install

# 2. Configure
cp .env.example .env
# Edit .env with your settings

# 3. Seed database (optional)
npm run seed

# 4. Start
npm run dev

# 5. API ready at http://localhost:5000/api
```

---

**Built with ❤️ using Node.js, Express, and MongoDB**
