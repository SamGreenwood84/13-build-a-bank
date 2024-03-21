// Import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// Import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize ProductTag model (table) by extending off Sequelize's Model class
class ProductTag extends Model {}

// Set up fields and rules for ProductTag model
ProductTag.init(
  {
    // Define id field with auto-incrementing primary key
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // Define product_id field as a foreign key referencing the product table
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'product', // Table name
        key: 'product_id' // Primary key column name in the referenced table
      }
    },
    // Define tag_id field as a foreign key referencing the tag table
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tag', // Table name
        key: 'id' // Primary key column name in the referenced table
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
    modelName: 'product_tag',
  }
);

// Add error handling for model operations
// Example: You can add validation rules or custom error handling hooks here if needed

module.exports = ProductTag;
