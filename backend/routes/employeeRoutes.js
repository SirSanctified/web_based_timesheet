import { Router } from "express";
import {
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";

const employeeRouter = Router();

employeeRouter.route("/employees").get(getEmployees);

employeeRouter
  .route("/employees/:id")
  .get(getEmployeeById)
  .put(updateEmployee)
  .delete(deleteEmployee);

export default employeeRouter;
