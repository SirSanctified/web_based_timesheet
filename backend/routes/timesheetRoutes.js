import { Router } from "express";
import {
  getTimesheets,
  getTimesheetById,
  createTimesheet,
  updateTimesheet,
  deleteTimesheet,
  deleteAllTimesheets,
  getTimesheetEntries,
  approveTimesheet,
} from "../controllers/timesheetController.js";

const timesheetRouter = Router();

timesheetRouter.route("/timesheets")
  .get(getTimesheets)
  .post(createTimesheet)
  .delete(deleteAllTimesheets);

timesheetRouter.route("/timesheets/:id")
  .get(getTimesheetById)
  .put(updateTimesheet)
  .delete(deleteTimesheet);

timesheetRouter.route("/timesheets/approve/:id").put(approveTimesheet);

timesheetRouter.route("/timesheets/entries/:id").get(getTimesheetEntries);


export default timesheetRouter;
