import { Employee } from "../models/association.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { sequelize } from "../config/db.js";

export const createEmployee = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      joinedDate,
      department,
      nationalId,
      salary,
      status,
      password,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);
    await sequelize.sync({ force: true });
    const newEmployee = await Employee.create({
      id: uuidv4(),
      firstName,
      lastName,
      email,
      phone,
      joinedDate,
      department,
      nationalId,
      designation,
      salary,
      status,
      password: hashedPassword,
    });
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.status(200).json(employees);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findOne({ where: { id: req.params.id } });
    res.status(200).json(employee);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      joinedDate,
      department,
      nationalId,
      designation,
      salary,
      status,
      projects,
    } = req.body;

    const updatedEmployee = await Employee.update(
      {
        firstName,
        lastName,
        email,
        phone,
        joinedDate,
        department,
        nationalId,
        designation,
        salary,
        status,
        projects,
      },
      { where: { id: req.params.id } }
    );
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    await Employee.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getEmployeeProjects = async (req, res) => {
  try {
    const employee = await Employee.findOne({ where: { id: req.params.id } });
    const projects = await employee.getProjects();
    res.status(200).json(projects);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getEmployeeTasks = async (req, res) => {
  try {
    const employee = await Employee.findOne({ where: { id: req.params.id } });
    const tasks = await employee.getTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getEmployeeTimesheets = async (req, res) => {
  try {
    const employee = await Employee.findOne({ where: { id: req.params.id } });
    const timesheets = await employee.getTimesheets();
    res.status(200).json(timesheets);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

