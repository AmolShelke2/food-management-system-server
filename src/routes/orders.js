const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/auth');

// Create order (public)
router.post(
  '/',
  [
    body('items').isArray({ min: 1 }).withMessage('Items must be a non-empty array'),
    body('items.*.productId').notEmpty().withMessage('Product ID is required'),
    body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    body('customer.name').notEmpty().trim().withMessage('Customer name is required'),
    body('customer.email').isEmail().withMessage('Valid email is required'),
    body('customer.phone').matches(/^[0-9]{10}$/).withMessage('Valid 10-digit phone number is required'),
    body('customer.address').notEmpty().trim().withMessage('Delivery address is required')
  ],
  orderController.createOrder
);

// Get order by ID (public - for tracking)
router.get('/:id', orderController.getOrderById);

// Admin routes (protected)
router.get('/', authMiddleware, orderController.getAllOrders);

router.patch(
  '/:id/status',
  authMiddleware,
  [
    body('status')
      .isIn(['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'])
      .withMessage('Invalid status')
  ],
  orderController.updateOrderStatus
);

router.get('/stats/overview', authMiddleware, orderController.getOrderStats);

module.exports = router;
