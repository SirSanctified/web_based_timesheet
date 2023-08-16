import { Router } from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

const projectRouter = Router();

projectRouter.route("/projects").get(getProjects).post(createProject);

projectRouter
  .route("/projects/:id")
  .get(getProjectById)
  .put(updateProject)
  .delete(deleteProject);

export default projectRouter;
