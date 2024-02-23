import adminSchema from "../models/adminSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { handleResponse } from "./common/handler.js";
import userSchema from "../models/userSchema.js";
import { Op } from "sequelize";
import ledgerSchema from "../models/ledgerSchema.js";
import { v4 as uuidv4 } from 'uuid';

const signUp = async (userData, res) => {
  try {
    const { admin_email } = userData;
    const getUser = await adminSchema.findOne({ where: { admin_email } });
    if (getUser) {
      return handleResponse({
        res,
        statusCode: "400",
        message: "User already exists",
      });
    }
    const newUser = new adminSchema(userData);
    const addedUser = await newUser.save();
    return handleResponse({
      res,
      statusCode: "200",
      message: "User added",
      data: addedUser,
    });
  } catch (error) {
    console.log(error);
    return handleResponse({
      res,
      statusCode: "500",
      message: "Internal server error",
    });
  }
};

const login = async (userData, res) => {
  try {
    const { admin_email, admin_password } = userData;
    const getUser = await adminSchema.findOne({ where: { admin_email } });
    if (!getUser) {
      return handleResponse({
        res,
        statusCode: "404",
        message: "User not found",
      });
    }
    const passwordValid = await bcrypt.compare(
      admin_password,
      getUser.admin_password
    );
    if (!passwordValid) {
      return handleResponse({
        res,
        statusCode: "404",
        message: "Incorrect email and password combination",
      });
    }
    const token = jwt.sign(
      { id: getUser.admin_id, type: "admin" },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_ACCESS_EXPIRATION,
      }
    );
    return handleResponse({
      res,
      statusCode: "200",
      message: "Login succusfull",
      data: {
        accessToken: token,
      },
    });
  } catch (error) {
    console.log(error);
    return handleResponse({
      res,
      statusCode: "500",
      message: "Internal server error",
    });
  }
};

const addUser = async (userData, res) => {
  try {
    const { user_email } = userData;
    const getUser = await userSchema.findOne({ where: { user_email } });
    if (getUser) {
      return handleResponse({
        res,
        statusCode: "400",
        message: "User already exists",
      });
    }
    const newUser = new userSchema(userData);
    const addedUser = await newUser.save();
    return handleResponse({
      res,
      statusCode: "200",
      message: "User added",
      data: addedUser,
    });
  } catch (error) {
    console.log(error);
    return handleResponse({
      res,
      statusCode: "500",
      message: "Internal server error",
    });
  }
};

const updateUser = async (userData, res) => {
  try {
    const { user_id, user_email } = userData;

    const getUser = await userSchema.findOne({ where: { user_id } });
    if (!getUser) {
      return handleResponse({
        res,
        statusCode: "404",
        message: "User not found",
      });
    }
    const userExistanceWithSameEmail = await userSchema.findOne({
      where: { user_email, user_id: { [Op.ne]: user_id } },
    });
    if (userExistanceWithSameEmail) {
      return handleResponse({
        res,
        statusCode: "400",
        message: "Another user with the same email already exists",
      });
    }

    await userSchema.update(userData, { where: { user_id } });

    const updatedUser = await userSchema.findOne({ where: { user_id } });
    return handleResponse({
      res,
      statusCode: "200",
      message: "User details updated",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return handleResponse({
      res,
      statusCode: "500",
      message: "Internal server error",
    });
  }
};

const deleteUser = async (userData, res) => {
  try {
    const { user_id } = userData;

    const getUser = await userSchema.findOne({ where: { user_id } });
    if (!getUser) {
      return handleResponse({
        res,
        statusCode: "404",
        message: "User not found",
      });
    }
    await userSchema.destroy({ where: { user_id } });
    return handleResponse({
      res,
      statusCode: "200",
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return handleResponse({
      res,
      statusCode: "500",
      message: "Internal server error",
    });
  }
};

const credit = async (userData, res) => {
  try {
    const { transactionAmount, user_id, description } = userData;
    const oldBalance = await ledgerSchema.findOne({
      where: { user_id },
      order: [["created_date_time", "DESC"]], // Order by created_date_time in descending order to get the last entry
    });
    const transID = uuidv4();
    if (!oldBalance) {
      return handleResponse({
        res,
        statusCode: "404",
        message: "User not found",
      });
    } else {
      const newBalance = parseFloat(oldBalance) + parseFloat(transactionAmount);
      const newLedgerEntry = await ledgerSchema.create({
        user_id: user_id,
        transactionUUID: transID,
        transactionType: "credit",
        transactionAmount: transactionAmount,
        oldBalance: oldBalance,
        currentBalance: newBalance,
        description: description,
        status: "success",
      });
      if (newLedgerEntry) {
        return handleResponse({
          res,
          statusCode: "200",
          message: "Credit success",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return handleResponse({
      res,
      statusCode: "500",
      message: "Internal server error",
    });
  }
};

const debit = async (userData, res) => {
  try {
    const { transactionAmount, user_id, description } = userData;
    const oldBalance = await ledgerSchema.findOne({
      where: { user_id },
      order: [["created_date_time", "DESC"]],
    });
    const transID = uuidv4();
    if (!oldBalance) {
      return handleResponse({
        res,
        statusCode: "404",
        message: "User not found",
      });
    } else {
      const newBalance = parseFloat(oldBalance) - parseFloat(transactionAmount);
      const newLedgerEntry = await ledgerSchema.create({
        user_id: user_id,
        transactionUUID: transID,
        transactionType: "debit",
        transactionAmount: transactionAmount,
        oldBalance: oldBalance,
        currentBalance: newBalance,
        description: description,
        status: "success",
      });
      if (newLedgerEntry) {
        return handleResponse({
          res,
          statusCode: "200",
          message: "Debit success",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return handleResponse({
      res,
      statusCode: "500",
      message: "Internal server error",
    });
  }
};

export default {
  signUp,
  login,
  addUser,
  updateUser,
  deleteUser,
  credit,
  debit,
};
