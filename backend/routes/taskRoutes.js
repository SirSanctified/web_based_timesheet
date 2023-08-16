import { Router } from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const taskRouter = Router();

taskRouter.route("/tasks").get(getTasks).post(createTask);

taskRouter
  .route("/tasks/:id")
  .get(getTaskById)
  .put(updateTask)
  .delete(deleteTask);

export default taskRouter;
