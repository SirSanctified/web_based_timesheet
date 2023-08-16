import { Router } from "express";
import {
  getTimesheets,
  getTimesheetById,
  createTimesheet,
  updateTimesheet,
  deleteTimesheet,
  deleteAllTimesheets,
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



export default timesheetRouter;
