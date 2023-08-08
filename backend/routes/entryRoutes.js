import { Router } from "express";
import {
  createEntry,
  getEntries,
  getEntryById,
  updateEntry,
  deleteEntry,
  deleteAllEntries,
} from "../controllers/entryController.js";

const entryRouter = Router();

entryRouter.route("/entries").get(getEntries).post(createEntry);

entryRouter.route("/entries/:id").get(getEntryById).put(updateEntry).delete(deleteEntry);

entryRouter.route("/entries").delete(deleteAllEntries);

export default entryRouter;
