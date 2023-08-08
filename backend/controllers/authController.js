import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import Employee from "../models/association.js";

dotenv.config();

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingEmployee = await Employee.findOne({ email });

    if (!existingEmployee)
      return res.status(404).json({ message: "Employee doesn't exist." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingEmployee.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials." });

    const accessToken = jwt.sign(
      { email: existingEmployee.email, id: existingEmployee.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { email: existingEmployee.email, id: existingEmployee.id },
      process.env.REFRESH_TOKEN_SECRET
    );

    await Employee.update(
      { refreshToken },
      { where: { id: existingEmployee.id } }
    );

    // set http only cookie with refresh token

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
    });

    res.status(200).json({ ...existingEmployee, token: accessToken });
  } catch (error) {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

export const logout = async (req, res) => {
  const { id } = req.params;

  try {
    await Employee.update({ refreshToken: null }, { where: { id } });
    res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong." });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const existingEmployee = await Employee.findAll({ where: { email } });

    if (!existingEmployee)
      return res.status(404).json({ message: "Employee doesn't exist." });

    // send email with reset link with node mailer.
    // the link should contain the employee id and a token, expiring in 30 minutes

    const resetToken = jwt.sign(
      { email: existingEmployee.email, id: existingEmployee.id },
      process.env.RESET_TOKEN_SECRET,
      { expiresIn: "30m" }
    );
    
    await Employee.update({ resetToken }, { where: { id: existingEmployee.id } });

    const actionUrl = `http://localhost:3000/reset-password/${existingEmployee.id}/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: existingEmployee.email,
      subject: "Reset Password",
      text: `Click on the link below to reset your password. The link will expire in 30 minutes. ${actionUrl}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        throw new Error(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

export const resetPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingEmployee = await Employee.findOne({ email });

    if (!existingEmployee)
      return res.status(404).json({ message: "Employee doesn't exist." });

    // check if the token is valid

    const foundToken = jwt.verify(
      req.params.token,
      process.env.RESET_TOKEN_SECRET
    );

    if (!foundToken) return res.status(401).json({ message: "Invalid token." });

    // if received token hasn' expired and is similar to the one in the database, update the password

    if (foundToken.id === existingEmployee.id) {
      const hashedPassword = await bcrypt.hash(password, 12);
      await Employee.update(
        { password: hashedPassword, resetToken: null, refreshToken: null },
        { where: { id: existingEmployee.id } }
      );
      res.status(200).json({ message: "Password updated successfully." });
    } else {
      throw new Error("Invalid token.");
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

export const register = async (req, res) => {
  const { email, password, firstName, lastName, role, nationalId, phone } =
    req.body;
  const { projects, tasks, timesheets } = req.body;

  const { adminId } = req.body;

  try {
    // if the person trying to register is not an admin, return an error

    const user = Employee.findById(adminId);
    if (user.role !== "admin") {
      return res
        .status(401)
        .json({ message: "You are not authorized to register new employees." });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // create a new employee

    const newEmployee = {
      email,
      firstName,
      lastName,
      role,
      nationalId,
      phone,
      id: uuidv4(),
    };

    const result = await Employee.create({
      ...newEmployee,
      password: hashedPassword,
    });

    if (timesheets) await Employee.addTimesheets(timesheets);
    if (projects) await Employee.addProjects(projects);
    if (tasks) await Employee.addTasks(tasks);

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
