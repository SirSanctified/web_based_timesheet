import { Router } from "express";
import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getEmployeeProjects,
  getEmployeeTasks,
  getEmployeeTimesheets
} from "../controllers/employeeController.js";

const employeeRouter = Router();

employeeRouter.route("/employees").get(getEmployees).post(createEmployee);

employeeRouter
  .route("/employees/:id")
  .get(getEmployeeById)
  .put(updateEmployee)
  .delete(deleteEmployee);

employeeRouter.route("/employees/:id/projects").get(getEmployeeProjects);

employeeRouter.route("/employees/:id/tasks").get(getEmployeeTasks);

employeeRouter.route("/employees/:id/timesheets").get(getEmployeeTimesheets);

export default employeeRouter;
