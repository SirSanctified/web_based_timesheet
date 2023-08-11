// create an admin user from terminal

import { Employee } from "./models/association.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { connectDB, sequelize } from "./config/db.js";
import * as readline from "node:readline/promises"; // This uses the promise-based APIs
import { stdin as input, stdout as output } from "node:process";
import {
  isEmailValid,
  isNationalIdValid,
  isPasswordValid,
  isPhoneValid,
} from "./utils/index.js";

const rl = readline.createInterface({ input, output });

dotenv.config();

const createAdmin = async () => {
  // get admin attributes from terminal stdin (interactive user input)
  const firstName = await rl.question("First name: ");
  const lastName = await rl.question("Last name: ");
  const email = await rl.question("Email: ");
  const phone = await rl.question("Phone: ");
  const nationalId = await rl.question("National ID: ");
  const password = await rl.question("Password: ");
  const role = "admin";
  const id = uuidv4();

  if (!isEmailValid(email)) {
    console.log("Email address must be valid eg. example@email.com");
    process.exit(1);
  } else if (!isNationalIdValid(nationalId)) {
    console.log("National Id must be valid eg. 12-123456A12");
    process.exit(1);
  } else if (!isPasswordValid(password)) {
    console.log(
      "Password must contain at least 8 characters, at least one lower case letter, at least one uppercase letter, at least one digit and at least one specia;l character."
    );
    process.exit(1);
  } else if (!isPhoneValid(phone)) {
    console.log("Please enter a valid phone number and try again");
    process.exit(1);
  } else {
    try {
      const hashedPassword = await bcrypt.hash(password, 12);

      const newAdmin = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        nationalId: nationalId.trim(),
        role,
        id,
      };
      await sequelize.sync({ force: false})
      await Employee.create({
        ...newAdmin,
        password: hashedPassword,
      });

      console.log("Admin created successfully.");
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
};

if (process.argv[2] === "--create-admin") {
  (async () => {
    await connectDB();
    await createAdmin();
  })();
} else {
  console.log("USAGE: node manage.js --create-admin");
  process.exit(1);
}
