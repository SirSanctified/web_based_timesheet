// create an admin user from terminal

import { Employee } from "./models/association.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import * as readline from 'node:readline/promises';  // This uses the promise-based APIs
import { stdin as input, stdout as output } from 'node:process';

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

  const isEmailValid = (email) => {
    
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const newAdmin = {
      firstName,
      lastName,
      email,
      phone,
      nationalId,
      role,
      id,
    };

    await Employee.create({
      ...newAdmin,
      password: hashedPassword,
    });

    console.log("Admin created successfully.")
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
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
