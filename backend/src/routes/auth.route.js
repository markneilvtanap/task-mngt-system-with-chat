import express from "express";
import {
  signup,
  login,
  logout,
  checkAuth,
  getAllUsers,
} from "../controllers/auth.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.get("/check", authenticateToken, checkAuth);
router.get("/AllUsers", authenticateToken, getAllUsers);
export default router;
