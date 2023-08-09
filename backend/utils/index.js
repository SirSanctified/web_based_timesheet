import nodemailer from "nodemailer";
import dotenv from "dotenv";

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const nationalIdRegex = /^[0-9]{2}-[0-9]{6}[a-zA-z]{1}[0-9]{2}$/;
const phoneRegex =/^(\d{1,3}\s?)?0?\d{2}\s?\d{3}\s?\d{4}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const isEmailValid = (email) => emailRegex.test(email.trim());

const isPhoneValid = (phone) => phoneRegex.test(phone.trim());

const isNationalIdValid = (nationalId) => nationalIdRegex.test(nationalId.trim());

const isRoleValid = (role) => ["admin", "approver", "general"].includes(role.trim());

const isPasswordValid = (password) => passwordRegex.test(password.trim());

export {
  isEmailValid,
  isNationalIdValid,
  isPasswordValid,
  isPhoneValid,
  isRoleValid,
  transporter,
};
