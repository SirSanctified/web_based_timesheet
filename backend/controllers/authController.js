import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { transporter } from "../utils/index.js";
import { Employee } from "../models/association.js";

dotenv.config();

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingEmployee = await Employee.findOne({
      where: { email },
      raw: true,
      attributes: { exclude: ["refreshToken", "resetToken"] },
    });

    if (!existingEmployee)
      return res.status(404).json({ error: "Employee doesn't exist." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingEmployee.password
    );

    if (!isPasswordCorrect)
      return res.status(401).json({ error: "Invalid credentials." });

    const accessToken = jwt.sign(
      {
        email: existingEmployee.email,
        id: existingEmployee.id,
        role: existingEmployee.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );

    const refreshToken = jwt.sign(
      {
        email: existingEmployee.email,
        id: existingEmployee.id,
        role: existingEmployee.role,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    await Employee.update(
      { refreshToken },
      { where: { id: existingEmployee.id } }
    );

    const updatedEmployee = await Employee.findOne({
      where: { id: existingEmployee.id },
      raw: true,
    });

    // set http only cookie with refresh token

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
      secure: false,
    });
    res.status(200).json({
      user: {
        id: updatedEmployee.id,
        firstName: updatedEmployee.firstName,
        lastName: updatedEmployee.lastName,
        email: updatedEmployee.email,
        role: updatedEmployee.role,
        nationalId: updatedEmployee.nationalId,
        phone: updatedEmployee.phone,
        role: updatedEmployee.role,
        isActive: updatedEmployee.isActive,
      },
      token: accessToken,
    });
  } catch (error) {
    res.status(401).json({ error: error.message || "Invalid credentials" });
  }
};

export const logout = async (req, res) => {
  const { id } = req.params;
  const cookies = req.cookies;

  if (!cookies?.refreshToken) return res.status(204);
  const refreshToken = cookies.refreshToken;

  try {
    const existingEmployee = await Employee.findOne({
      where: { refreshToken },
    });
    if (!existingEmployee) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
        secure: false,
      });
      return res.status(204);
    }
    existingEmployee.refreshToken = null;
    await existingEmployee.save();
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
    });
    res.status(204);
  } catch (error) {
    console.log(error);
    res.status(204);
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const existingEmployee = await Employee.findOne({ where: { email } });
    if (!existingEmployee)
      return res.status(404).json({ error: "Employee doesn't exist." });

    // send email with reset link with node mailer.
    // the link should contain the employee id and a token, expiring in 30 minutes

    const resetToken = jwt.sign(
      { email: existingEmployee.email, id: existingEmployee.id },
      process.env.RESET_PASSWORD_SECRET,
      { expiresIn: "30m" }
    );

    await Employee.update(
      { resetToken },
      { where: { id: existingEmployee.id } }
    );

    const actionUrl = `${process.env.CLIENT_ADDRESS}/reset-password/${resetToken}/${existingEmployee.id}`;
    console.log(actionUrl);
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: existingEmployee.email,
      subject: "Reset Password",
      text: `Click on the link below to reset your password. The link will expire in 30 minutes. ${actionUrl}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid credentials" });
  }
};

export const resetPassword = async (req, res) => {
  const { password } = req.body;
  const { token, id } = req.params;

  try {
    // check if token has expired

    const foundToken = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
    console.log("Found token", foundToken);
    const existingEmployee = await Employee.findByPk(id);

    if (!existingEmployee)
      return res.status(404).json({ error: "Employee doesn't exist." });

    if (!foundToken) return res.status(401).json({ error: "Invalid token." });

    // if received token hasn't expired and is similar to the one in the database, update the password

    if (foundToken.id === existingEmployee.id) {
      const hashedPassword = await bcrypt.hash(password, 12);
      await Employee.update(
        { password: hashedPassword, resetToken: null, refreshToken: null },
        { where: { id: existingEmployee.id } }
      );

      const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: existingEmployee.email,
        subject: "Password Reset Successful",
        text: `Your password has been reset successfully. If you didn't request this, please contact your administrator.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          throw new Error(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      res.status(200).json({ message: "Password updated successfully." });
    }
  } catch (error) {
    console.log(error);
    if (error instanceof jwt.TokenExpiredError)
    {
      res.status(401).json({ error: "The token you are using has expired, please request another one." });
    } else {
      res.status(500).json({ error: "An internal server error occurred"})
    }
  }
};

export const register = async (req, res) => {
  const { email, password, firstName, lastName, role, nationalId, phone } =
    req.body;

  try {
    // if the person trying to register is not an admin, return an error.
    // get user role from the token

    if (req.user.role !== "admin") {
      return res
        .status(401)
        .json({ error: "You are not authorized to register new employees." });
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

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: newEmployee.email,
      subject: "Account Created",
      text: `Your account has been created successfully. Please contact your administrator to get your password.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message || "Something went wrong." });
  }
};
