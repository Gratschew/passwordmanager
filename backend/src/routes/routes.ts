import express from "express";
import {register, login, getUsers, validateTwoFa, verifyTwoFa} from "../controllers/authController";
const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/validateTwoFa", validateTwoFa);
router.post("/auth/verifyTwoFa", verifyTwoFa);
// this is a test endpoint where you can get all the users registered in the database!
router.get("/getusers", getUsers);


export default router; 