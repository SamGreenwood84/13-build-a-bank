// Import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// Import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// Set up fields and rules for Product model
Product.init(
  {
    // Define product_id field with auto-incrementing primary key
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // Define product_name field with string type and not null constraint
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Define price field with decimal type and not null constraint
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    // Define stock field with integer type, not null constraint, and default value
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      // Add validation for minimum stock value
      validate: {
        min: 0
      }
    },
    // Define category_id field as a foreign key referencing the category table
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // Allow null since it's a foreign key
      references: {
        model: 'category', // Table name
        key: 'category_id' // Primary key column name in the referenced table
      }
    }
  },
  {
    // Pass sequelize connection instance
    sequelize,
    // Disable timestamps columns (createdAt and updatedAt)
    timestamps: false,
    // Ensure that the model name is the same as the table name
    freezeTableName: true,
    // Use underscored naming convention for auto-generated attributes (e.g., createdAt, updatedAt)
    underscored: true,
    // Model name to use in sequelize queries
    modelName: 'product',
  }
);

// Add error handling for model operations
Product.addHook('beforeValidate', (product, options) => {
  // Example: Handle validation errors
  if (product.price < 0) {
    throw new Error('Price cannot be negative');
  }
});

// Add associations if needed (e.g., Product belongs to Category)
// Product.belongsTo(Category, { foreignKey: 'category_id' });

module.exports = Product;
