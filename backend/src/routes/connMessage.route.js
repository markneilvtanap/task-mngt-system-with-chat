import express from "express";
import {
  requestToMesssage,
  acceptRequestMesssage,
  getRequestMessage,
  rejectRequestMesssage,
} from "../controllers/connMessage.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authenticateToken, getRequestMessage);

router.post("/request", authenticateToken, requestToMesssage);

router.patch("/accept/:id", authenticateToken, acceptRequestMesssage);

router.patch("/reject/:id", authenticateToken, rejectRequestMesssage);

export default router;
