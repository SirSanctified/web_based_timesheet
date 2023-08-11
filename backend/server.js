import express, { Router } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/db.js";
import verifyJWT from "./middleware/verifyJWT.js";

// Routes
import employeeRouter from "./routes/employeeRoutes.js";
import projectRouter from "./routes/projectRoutes.js";
import taskRouter from "./routes/taskRoutes.js";
import commentRouter from "./routes/commentRoutes.js";
import timesheetRouter from "./routes/timesheetRoutes.js";
import entryRouter from "./routes/entryRoutes.js";
import authRouter from "./routes/authRoutes.js";
import requestRouter from "./routes/requestRoutes.js";
import handleRefreshToken from "./controllers/refreshTokenController.js";

const PORT = process.env.PORT || 4500;
const app = express();
const router = Router();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

router.get("/refresh-token", handleRefreshToken);

// use routes
app.use("/api", router);
app.use("/api", requestRouter);
app.use("/api/register", verifyJWT);
app.use("/api/logout/:id", verifyJWT);
app.use("/api", authRouter);
app.use("/api", verifyJWT);
app.use("/api", employeeRouter);
app.use("/api", projectRouter);
app.use("/api", taskRouter);
app.use("/api", commentRouter);
app.use("/api", timesheetRouter);
app.use("/api", entryRouter);

dotenv.config();
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
