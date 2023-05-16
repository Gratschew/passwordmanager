import express from "express";
import {register, login, logout, validateTwoFa, verifyTwoFa} from "../controllers/authController";
import { auth } from "../middleware/auth";
import { getServices, createService, modifyService, deleteService } from "../controllers/serviceController";
const router = express.Router();
// auth
router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/validateTwoFa", validateTwoFa);
router.post("/auth/verifyTwoFa", verifyTwoFa);
router.post('/auth/logout', logout);


// services
router.get("/getServices", auth, getServices);
router.post("/createService", auth, createService);
router.post("/modifyService", auth, modifyService);
router.post("/deleteService", auth, deleteService);


export default router; 