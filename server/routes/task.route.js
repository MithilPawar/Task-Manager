import Router from "express";
import {
  createTask,
  deleteTask,
  getAllTask,
  getTaskById,
  updateTask,
} from "../controller/task.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/").post(verifyJWT, createTask).get(verifyJWT, getAllTask);

router
  .route("/:taskId")
  .get(verifyJWT, getTaskById)
  .put(verifyJWT, updateTask)
  .delete(verifyJWT, deleteTask);

export default router;
