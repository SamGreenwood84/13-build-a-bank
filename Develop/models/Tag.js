// Import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// Import our database connection from config.js
const sequelize = require('../config/connection.js');

// Initialize Tag model (table) by extending off Sequelize's Model class
class Tag extends Model {}

// Set up fields and rules for Tag model
Tag.init(
  {
    // Define id field with auto-incrementing primary key
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // Define tag_name field with string type and not null constraint
    tag_name: {
      type: DataTypes.STRING,
      allowNull: false
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
    modelName: 'tag',
  }
);

// Add error handling for model operations
// Example: You can add validation rules or custom error handling hooks here if needed

module.exports = Tag;
