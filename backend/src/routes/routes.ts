import express from "express";
import {register, login, getUsers} from "../controllers/authController";
const router = express.Router();

router.post("/register", register);
router.get("/login", login);

// this is a test endpoint where you can get all the users registered in the database!
router.get("/getusers", getUsers);


export default router;