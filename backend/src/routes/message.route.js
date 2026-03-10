import express from "express";
import {
  getUsersForSideBar,
  getMessages,
  sendMessage,
  getOneToOneChatUsers,
} from "../controllers/message.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/users", authenticateToken, getUsersForSideBar);

router.get("/chat-users", authenticateToken, getOneToOneChatUsers);

router.get("/:id/task/:taskId", authenticateToken, getMessages);

router.post("/send/:senderId/task/:taskId", authenticateToken, sendMessage);

export default router;
