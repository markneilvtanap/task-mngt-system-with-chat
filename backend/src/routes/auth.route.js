import express from "express";
import {
  signup,
  login,
  logout,
  checkAuth,
  getAllUsers,
  getMyID,
  getMyData,
} from "../controllers/auth.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/check", authenticateToken, checkAuth);
router.get("/AllUsers", authenticateToken, getAllUsers);
router.get("/my-id", authenticateToken, getMyID);
router.get("/my-data/:id", authenticateToken, getMyData);
router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);

export default router;
