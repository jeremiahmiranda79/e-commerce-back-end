// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');

// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    //define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    }, 
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      // Validate that the value is a decimal
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    stock: {
      // Validate that the number is numeric
      type: DataTypes.INTEGER,
      allowNull: false,
      
      // Sets a default value at 10
      defaultValue: 10
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;