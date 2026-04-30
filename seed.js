require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./src/models/Product");
const Admin = require("./src/models/Admin");
const Orders = require("./src/models/Order");
const connectDB = require("./src/config/database");

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Product.deleteMany({});
    await Admin.deleteMany({});
    await Orders.deleteMany({});

    // Seed products
    const products = [
      // Pizza
      {
        name: "Margherita Pizza",
        description:
          "Classic Italian pizza with fresh basil, mozzarella, and tomato sauce",
        price: 299,
        category: "pizza",
        image:
          "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500",
        availability: true,
        preparationTime: 20,
      },
      {
        name: "Pepperoni Pizza",
        description: "Loaded with pepperoni slices and mozzarella cheese",
        price: 349,
        category: "pizza",
        image:
          "https://images.unsplash.com/photo-1692737580547-b45bb4a02356?w=500",
        availability: true,
        preparationTime: 22,
      },
      {
        name: "Vegetarian Pizza",
        description:
          "Fresh vegetables including bell peppers, onions, mushrooms, and tomatoes",
        price: 329,
        category: "pizza",
        image:
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500",
        availability: true,
        preparationTime: 20,
      },

      // Burgers
      {
        name: "Classic Cheeseburger",
        description:
          "Juicy beef patty with melted cheddar cheese, lettuce, and tomato",
        price: 249,
        category: "burgers",
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
        availability: true,
        preparationTime: 15,
      },
      {
        name: "Bacon Burger",
        description: "Crispy bacon, beef patty, cheese, and special sauce",
        price: 279,
        category: "burgers",
        image:
          "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500",
        availability: true,
        preparationTime: 16,
      },
      {
        name: "Double Deluxe Burger",
        description: "Two beef patties with double cheese and all the toppings",
        price: 349,
        category: "burgers",
        image:
          "https://images.unsplash.com/photo-1709081629812-7e3ff8cdde3d?w=500",
        availability: true,
        preparationTime: 18,
      },

      // Chicken
      {
        name: "Spicy Chicken Drumsticks",
        description: "Crispy fried chicken drumsticks with spicy coating",
        price: 199,
        category: "chicken",
        image:
          "https://images.unsplash.com/photo-1638439430466-b2bb7fdc1d67?w=500",
        availability: true,
        preparationTime: 20,
      },
      {
        name: "Grilled Chicken Legs",
        description: "Perfectly grilled chicken legs with herbs and spices",
        price: 229,
        category: "chicken",
        image:
          "https://plus.unsplash.com/premium_photo-1695931839969-f33ab12e107b?w=500",
        availability: true,
        preparationTime: 25,
      },
      {
        name: "Chicken Wings Box",
        description: "One pound of crispy chicken wings with dipping sauce",
        price: 289,
        category: "chicken",
        image:
          "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=500",
        availability: true,
        preparationTime: 22,
      },

      // Desserts
      {
        name: "Chocolate Cake Slice",
        description: "Rich chocolate cake with chocolate frosting",
        price: 149,
        category: "desserts",
        image:
          "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
        availability: true,
        preparationTime: 5,
      },
      {
        name: "Cheesecake",
        description: "Creamy cheesecake with graham cracker crust",
        price: 169,
        category: "desserts",
        image:
          "https://images.unsplash.com/photo-1702925614886-50ad13c88d3f?w=500",
        availability: true,
        preparationTime: 5,
      },
      {
        name: "Ice Cream Sundae",
        description: "Vanilla ice cream with chocolate sauce and toppings",
        price: 129,
        category: "desserts",
        image:
          "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500",
        availability: true,
        preparationTime: 3,
      },

      // Beverages
      {
        name: "Fresh Orange Juice",
        description: "Freshly squeezed orange juice",
        price: 89,
        category: "beverages",
        image:
          "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500",
        availability: true,
        preparationTime: 5,
      },
      {
        name: "Iced Coffee",
        description: "Cold brew coffee with ice and cream",
        price: 99,
        category: "beverages",
        image:
          "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500",
        availability: true,
        preparationTime: 3,
      },
      {
        name: "Smoothie Bowl",
        description: "Strawberry and banana smoothie bowl with granola",
        price: 149,
        category: "beverages",
        image:
          "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=500",
        availability: true,
        preparationTime: 5,
      },
    ];

    await Orders.insertMany([]);

    await Product.insertMany(products);
    console.log("✓ Products seeded successfully");

    // Seed admin user
    const admin = new Admin({
      email: "foodie@email.com",
      password: "foodie123",
    });
    await admin.save();
    console.log("✓ Admin user created");
    console.log("  Email: foodie@email.com");
    console.log("  Password: foodie123");

    console.log("\n✓ Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedData();
