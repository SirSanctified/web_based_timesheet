import {
  getRequestById,
  getRequests,
  deleteRequest,
} from "../controllers/requestController.js";
import { Router } from "express";

const requestRouter = Router();

requestRouter
  .get("/requests", getRequests)
  .get("/requests/:id", getRequestById)
  .delete("/requests/:id", deleteRequest);

export default requestRouter;
