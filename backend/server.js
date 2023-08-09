import express from "express";
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

const PORT = process.env.PORT || 3500;
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

// use routes
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
