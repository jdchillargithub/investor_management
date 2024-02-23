import adminService from "../../services/adminService.js";

const signUp = async (req, res) => {
  try {
    const signupResponse = await adminService.signUp(req.body, res);
    return signupResponse;
  } catch (error) {
    console.log("error", error);
  }
};

const login = async (req, res) => {
  try {
    const loginResponse = await adminService.login(req.body, res);
    return loginResponse;
  } catch (error) {
    console.log("error", error);
  }
};

const createUser = async (req, res) => {
  try {
    const createRes = await adminService.addUser(req.body, res);
    return createRes;
  } catch (error) {
    console.log("createUserError==>", error);
  }
};
const editUser = async (req, res) => {
  try {
    const editUserRes = await adminService.updateUser(req.body, res);
    return editUserRes;
  } catch (error) {
    console.log("editUserError==>", error);
  }
};
const deleteUser = async (req, res) => {
  try {
    const deleteUserRes = await adminService.deleteUser(req.body, res);
    return deleteUserRes;
  } catch (error) {
    console.log("deleteUserError==>", error);
  }
};

export default { signUp, login, createUser, editUser, deleteUser };
