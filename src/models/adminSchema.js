// models/user.js
import { DataTypes } from 'sequelize' ;
import sequelize from '../dbConnect.js';
import bcrypt from 'bcrypt';

const adminSchema = sequelize.define('admin', {
  admin_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  admin_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  admin_email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  admin_phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  admin_password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_date_time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  update_date_time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  
});

adminSchema.beforeCreate(async (adminSchema) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(adminSchema.admin_password, saltRounds);
  adminSchema.admin_password = hashedPassword;
});

export default adminSchema;
