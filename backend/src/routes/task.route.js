import express from "express";
import {
  createTask,
  deleteTask,
  editTask,
  getAllTask,
  getAllTaskCounts,
  getAssignedTask,
  getAssignedToOthersTask,
  getSelfTask,
} from "../controllers/task.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authenticateToken, getAllTask);
router.get("/allTaskCounts", authenticateToken, getAllTaskCounts);
router.get("/assigned-to-me", authenticateToken, getAssignedTask);
router.get("/created-by-me", authenticateToken, getSelfTask);
router.get("/assigned-by-me", authenticateToken, getAssignedToOthersTask);
router.post("/", authenticateToken, createTask);
router.put("/:id", authenticateToken, editTask);
router.delete("/:id", authenticateToken, deleteTask);

export default router;
