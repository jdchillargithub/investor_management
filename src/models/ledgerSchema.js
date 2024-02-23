// models/user.js
import { DataTypes } from "sequelize";
import sequelize from "../dbConnect.js";

const ledgerSchema = sequelize.define("ledger", {
  ledger_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "user",
      key: "user_id",
    },
  },
  transactionUUID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  transactionType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  transactionAmount: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  oldBalance: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  currentBalance: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
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

export default ledgerSchema;
