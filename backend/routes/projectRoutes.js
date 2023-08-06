import { Router } from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectEmployees,
  getProjectTasks,
} from "../controllers/projectController.js";

const projectRouter = Router();

projectRouter.route("/projects").get(getProjects).post(createProject);

projectRouter
  .route("/projects/:id")
  .get(getProjectById)
  .put(updateProject)
  .delete(deleteProject);

projectRouter.route("/projects/:id/employees").get(getProjectEmployees);

projectRouter.route("/projects/:id/tasks").get(getProjectTasks);

export default projectRouter;
