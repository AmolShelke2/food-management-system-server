const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/auth');

// Public routes
router.get('/', productController.getAllProducts);
router.get('/categories', productController.getCategories);
router.get('/:id', productController.getProductById);

// Admin routes (protected)
router.post(
  '/',
  authMiddleware,
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('category').isIn(['pizza', 'burgers', 'chicken', 'desserts', 'beverages']).withMessage('Invalid category'),
    body('image').isURL().withMessage('Image must be a valid URL')
  ],
  productController.createProduct
);

router.put(
  '/:id',
  authMiddleware,
  [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('category').optional().isIn(['pizza', 'burgers', 'chicken', 'desserts', 'beverages']).withMessage('Invalid category')
  ],
  productController.updateProduct
);

router.delete('/:id', authMiddleware, productController.deleteProduct);

module.exports = router;
