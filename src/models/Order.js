const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String,
        price: Number,
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        subtotal: Number,
      },
    ],
    customer: {
      name: {
        type: String,
        required: [true, "Customer name is required"],
      },
      email: {
        type: String,
        required: [true, "Customer email is required"],
        match: [
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Please provide a valid email",
        ],
      },
      phone: {
        type: String,
        required: [true, "Phone number is required"],
        match: [/^[0-9]{10}$/, "Please provide a valid 10-digit phone number"],
      },
      address: {
        type: String,
        required: [true, "Delivery address is required"],
      },
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "preparing",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
    estimatedDeliveryTime: {
      type: Date,
    },
    notes: String,
  },
  { timestamps: true },
);

// Generate order number before saving
orderSchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  try {
    const count = await this.constructor.countDocuments();
    this.orderNumber = `ORD-${Date.now()}-${count + 1}`;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Order", orderSchema);
