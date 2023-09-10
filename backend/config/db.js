import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const dbHost = process.env.DB_HOST;
const db = process.env.DB;
const sequelize = new Sequelize(`mysql://${dbUser}:${dbPassword}@${dbHost}/${db}`, {logging: false});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
}

export { connectDB, sequelize };