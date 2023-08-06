import { Task } from "../models/association.js";
import { v4 as uuidv4 } from "uuid";
import { sequelize } from "../config/db.js";

export const createTask = async (req, res) => {
  try {
    const {
      taskName,
      taskDescription,
      taskStartDate,
      taskEndDate,
      taskStatus,
    } = req.body;
    await sequelize.sync({ force: true });
    const newTask = await Task.create({
      id: uuidv4(),
      taskName,
      taskDescription,
      taskStartDate,
      taskEndDate,
      taskStatus,
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id } });
    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const {
      taskName,
      taskDescription,
      taskEmployees,
      taskStartDate,
      taskEndDate,
      taskStatus,
      taskProject,
      taskComments,
    } = req.body;
    const updatedTask = await Task.update(
      {
        taskName,
        taskDescription,
        taskComments,
        employees: taskEmployees,
        taskStartDate,
        taskEndDate,
        taskStatus,
        projectId: taskProject,
      },
      { where: { id: req.params.id } }
    );
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    await Task.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTaskEmployees = async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id } });
    const employees = await task.getEmployees();
    res.status(200).json(employees);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTaskComments = async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id } });
    const comments = await task.getComments();
    res.status(200).json(comments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
