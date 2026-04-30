const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
      maxlength: [100, 'Product name cannot be more than 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Please provide a product description'],
      maxlength: [500, 'Description cannot be more than 500 characters']
    },
    price: {
      type: Number,
      required: [true, 'Please provide a product price'],
      min: [0, 'Price cannot be negative']
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: ['pizza', 'burgers', 'chicken', 'desserts', 'beverages'],
      lowercase: true
    },
    image: {
      type: String,
      required: [true, 'Please provide a product image URL']
    },
    availability: {
      type: Boolean,
      default: true
    },
    preparationTime: {
      type: Number, // in minutes
      default: 20
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
