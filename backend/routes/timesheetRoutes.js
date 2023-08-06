import { Router } from "express";
import {
  getTimesheets,
  getTimesheetById,
  createTimesheet,
  updateTimesheet,
  deleteTimesheet,
  deleteAllTimesheets,
} from "../controllers/timesheetController.js";

const timesheetRouter = Router();

timesheetRouter.route("/timesheets")
  .get(getTimesheets)
  .post(createTimesheet);

timesheetRouter.route("/timesheets/:id")
  .get(getTimesheetById)
  .put(updateTimesheet)
  .delete(deleteTimesheet);

timesheetRouter.delete("/timesheets/deleteAll", deleteAllTimesheets);

export default timesheetRouter;
