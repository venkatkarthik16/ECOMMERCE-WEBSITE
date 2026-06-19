import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';

export const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  email: {
    type: DataTypes.STRING,
    unique: true
  },

  phone: {
    type: DataTypes.STRING,
    unique: true
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false
  },

  createdAt: {
    type: DataTypes.DATE(3)
  },

  updatedAt: {
    type: DataTypes.DATE(3)
  }
});