import express from "express";
import {
  createTask,
  deleteTask,
  editTask,
  getAllTask,
  getAssignedTask,
  getAssignedToOthersTask,
  getSelfTask,
} from "../controllers/task.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authenticateToken, getAllTask);
router.post("/", authenticateToken, createTask);
router.put("/:id", authenticateToken, editTask);
router.delete("/:id", authenticateToken, deleteTask);
router.get("/assigned-to-me", authenticateToken, getAssignedTask);
router.get("/created-by-me", authenticateToken, getSelfTask);
router.get("/assigned-by-me", authenticateToken, getAssignedToOthersTask);

export default router;
