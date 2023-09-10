import { Task, Employee, Project, Entry } from "../models/association.js";
import { v4 as uuidv4 } from "uuid";
import { sequelize } from "../config/db.js";

export const createTask = async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ error: "You are not allowed to add tasks." });
  try {
    const {
      taskName,
      taskDescription,
      taskStartDate,
      taskEndDate,
      taskStatus,
      projectId,
      employees,
    } = req.body;
    await sequelize.sync({ force: false });
    const newTask = await Task.create({
      id: uuidv4(),
      taskName,
      taskDescription,
      taskStartDate,
      taskEndDate,
      taskStatus,
      projectId,
    });

    if (employees) await Task.addEmployees();
    res.status(201).json({ ...newTask, employees });
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
    const task = await Task.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Entry,
        },
        {
          model: Project,
        },
        {
          model: Employee,
          attributes: { exclude: ["password", "refreshToken", "resetToken"] },
        },
      ],
    });
    res.status(200).json(task);
  } catch (error) {
    lo;
    res.status(404).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  if (req.user.role !== "admin")
    return res
      .status(403)
      .json({ error: "You are not allowed to edit this task." });
  try {
    const {
      taskName,
      taskDescription,
      taskEmployees,
      taskStartDate,
      taskEndDate,
      taskStatus,
      projectId,
    } = req.body;
    const updatedTask = await Task.update(
      {
        taskName,
        taskDescription,
        taskStartDate,
        taskEndDate,
        taskStatus,
        projectId,
      },
      { where: { id: req.params.id } }
    );
    if (taskEmployees) {
      const task = await Task.findByPk(req.params.id);
      await task.addEmployees(taskEmployees);
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  if (req.user.role !== "admin")
    return res
      .status(403)
      .json({ error: "You are not allowed to delete this task." });
  try {
    await Task.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
