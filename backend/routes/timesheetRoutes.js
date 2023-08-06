import { Router } from "express";
import {
  getTimesheets,
  getTimesheetById,
  createTimesheet,
  updateTimesheet,
  deleteTimesheet,
  deleteAllTimesheets,
  getTimesheetComments,
  getTimesheetEntries,
} from "../controllers/timesheetController.js";

const timesheetRouter = Router();

timesheetRouter.route("/timesheets")
  .get(getTimesheets)
  .post(createTimesheet);

timesheetRouter.route("/timesheets/:id")
  .get(getTimesheetById)
  .put(updateTimesheet)
  .delete(deleteTimesheet);

timesheetRouter.delete("/timesheets", deleteAllTimesheets);

timesheetRouter.route("/timesheets/comments/:id").get(getTimesheetComments);

timesheetRouter.route("/timesheets/entries/:id").get(getTimesheetEntries);


export default timesheetRouter;
