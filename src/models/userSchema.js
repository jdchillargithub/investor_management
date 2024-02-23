// models/user.js
import { DataTypes } from "sequelize";
import sequelize from "../dbConnect.js";
import bcrypt from "bcrypt";

const userSchema = sequelize.define("user", {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  user_phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_interest: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_cycle: {
    type: DataTypes.DATE,
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

userSchema.beforeCreate(async (userSchema) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(
    userSchema.user_password,
    saltRounds
  );
  userSchema.user_password = hashedPassword;
});

export default userSchema;
