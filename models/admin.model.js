require('dotenv').config();
const { Model, DataTypes, Op } = require('sequelize');
const { seq: DB } = require('../sequelize');

class Admin extends Model {}

Admin.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    firstName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    lastName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'admin',
    underscored: true,
    timestamps: true,
    sequelize: DB,
  }
);

module.exports = Admin;
