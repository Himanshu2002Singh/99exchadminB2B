const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Admin = sequelize.define('admin', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('superadmin', 'supermaster', 'master', 'client'),
    allowNull: false,
  },
  balance: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00,
  },
  // free_chip: {
  //   type: DataTypes.DECIMAL(10, 2),
  //   defaultValue: 0.00,
  // },
  downline_share: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0.00,
  },
  my_share: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0.00,
  },
    status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active',
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = Admin;