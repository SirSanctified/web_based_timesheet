import { Router } from "express";
import {
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
} from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password/:token/:id", resetPassword);
authRouter.post("/logout/:id", logout);
authRouter.post("/register", register);

export default authRouter;
