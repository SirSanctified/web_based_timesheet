import { Employee } from "../models/association.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { sequelize } from "../config/db.js";

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
    res.status(200).json(employees);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id, {
      attributes: {
        exclude: ["password"],
      },
    });
    res.status(200).json(employee);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, nationalId, role, isActive } =
      req.body;

    const updatedEmployee = {
      firstName,
      lastName,
      email,
      phone,
      nationalId,
      role,
      isActive,
    }
    await Employee.update(
      updatedEmployee,
      { where: { id: req.params.id } }
    );
    res.status(200).json({...updatedEmployee, id: req.params.id});
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
};
