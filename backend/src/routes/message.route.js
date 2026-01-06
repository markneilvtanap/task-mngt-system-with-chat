import express from "express";
import {
  getUsersForSideBar,
  getMessages,
  sendMessage,
} from "../controllers/message.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/users", authenticateToken, getUsersForSideBar);

router.get("/:id", authenticateToken, getMessages);

router.post("/send/:id", authenticateToken, sendMessage);

export default router;
