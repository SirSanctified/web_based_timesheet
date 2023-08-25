import { Project, Task, Entry, Employee } from "../models/association.js";
import { v4 as uuidv4 } from "uuid";
import { sequelize } from "../config/db.js";

export const createProject = async (req, res) => {
  try {
    const {
      projectName,
      projectCode,
      projectDescription,
      projectStartDate,
      projectEndDate,
      projectStatus,
    } = req.body;
    await sequelize.sync({ force: false });
    const newProject = await Project.create({
      id: uuidv4(),
      projectName,
      projectCode,
      projectDescription,
      projectStartDate,
      projectEndDate,
      projectStatus,
    });
    res.status(201).json(newProject);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.status(200).json(projects);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Entry,
        },
        {
          model: Task,
        },
        {
          model: Employee,
          attributes: { exclude: ["password", "refreshToken", "resetToken"] },
        },
      ],
    });
    res.status(200).json(project);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const {
      projectName,
      projectCode,
      projectDescription,
      projectStartDate,
      projectEndDate,
      projectStatus,
    } = req.body;
    const updatedProject = await Project.update(
      {
        projectName,
        projectCode,
        projectDescription,
        projectStartDate,
        projectEndDate,
        projectStatus,
      },
      { where: { id: req.params.id } }
    );
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    await Project.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
