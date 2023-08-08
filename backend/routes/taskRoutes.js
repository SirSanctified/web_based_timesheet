import { Router } from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskEmployees,
  getTaskComments,
  getTaskEntries,
} from "../controllers/taskController.js";

const taskRouter = Router();

taskRouter.route("/tasks").get(getTasks).post(createTask);

taskRouter
  .route("/tasks/:id")
  .get(getTaskById)
  .put(updateTask)
  .delete(deleteTask);

taskRouter.route("/tasks/:id/employees").get(getTaskEmployees);

taskRouter.route("/tasks/:id/comments").get(getTaskComments);

taskRouter.route("/tasks/:id/entries").get(getTaskEntries);

export default taskRouter;
