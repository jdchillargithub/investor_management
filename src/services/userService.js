import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { handleResponse } from "./common/handler.js";
import userSchema from "../models/userSchema.js";



const login = async (userData, res) => {
  try {
    const { user_email, user_password } = userData;
    const getUser = await userSchema.findOne({ where: { user_email } });
    if (!getUser) {
      return handleResponse({
        res,
        statusCode: "404",
        message: "User not found",
      });
    }
    const passwordValid = await bcrypt.compare(
      user_password,
      getUser.user_password
    );
    if (!passwordValid) {
      return handleResponse({
        res,
        statusCode: "404",
        message: "Incorrect email and password combination",
      });
    }
    const token = jwt.sign(
      { id: getUser.user_id, type: "user" },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_REFRESH_EXPIRATION,
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
  }
};

export default { signUp, login };
