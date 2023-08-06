import { Router } from "express";
import {
  createComment,
  getComments,
  getCommentById,
  updateComment,
  deleteComment,
  getCommentsByEmployee,
  getCommentsByEmployeeAndTask,
  getCommentsByTask,
} from "../controllers/commentController.js";

const commentRouter = Router();

commentRouter.route("/comments").get(getComments).post(createComment);

commentRouter
  .route("/comments/:id")
  .get(getCommentById)
  .put(updateComment)
  .delete(deleteComment);

commentRouter.route("/comments/task/:id").get(getCommentsByTask);

commentRouter.route("/comments/employee/:id").get(getCommentsByEmployee);

commentRouter
  .route("/comments/employee/:employeeId/task/:taskId")
  .get(getCommentsByEmployeeAndTask);

export default commentRouter;
