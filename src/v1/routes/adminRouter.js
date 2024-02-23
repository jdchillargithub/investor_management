import CLR from '../controllers/adminController.js'
import express from 'express';

const route = express.Router();

route.post("/sign-up", CLR.signUp)
route.post("/login", CLR.login)
route.post("/add-user", CLR.createUser)
route.post("/edit-user", CLR.editUser)
route.post("/del-user", CLR.deleteUser)

export default route