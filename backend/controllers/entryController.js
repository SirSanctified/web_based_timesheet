import { Entry } from "../models/association.js";
import { sequelize } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

export const createEntry = async (req, res) => {
  const { date, hours } = req.body;
  try {
    await sequelize.sync({ force: true });
    await Entry.create({
      id: uuidv4(),
      date,
      hours,
    });
    res.status(201).json({ message: "Entry successifully created!" });
  } catch (err) {
    res
      .status(400)
      .json({ error: err.message || "Something went wrong with the request" });
  }
};

export async function getEntries(req, res) {
  try {
    const entries = await Entry.findAll();
    res.status(200).json(entries);
  } catch (err) {
    res
      .status(404)
      .json({ error: err.message || "Something went wrong with the request" });
  }
}

export async function getEntryById(req, res) {
  const { id } = req.params;
  try {
    const entry = await Entry.findByPk(id);
    res.status(200).json(entry);
  } catch (err) {
    res
      .status(404)
      .json({ error: err.message || "Something went wrong with the request" });
  }
}

export async function updateEntry(req, res) {
  const { id } = req.params;
  const { hours, date } = req.body;
  try {
    const updatedEntry = await Entry.update({ hours, date }, { where: { id } });
    res.status(200).json(updatedEntry);
  } catch (err) {
    res
      .status(400)
      .json({ error: err.message || "Something went wrong with the request" });
  }
}

export async function deleteEntry(req, res) {
  const { id } = req.params;
  try {
    await Entry.destroy({ where: { id } });
    res.status(204);
  } catch (err) {
    res
      .status(400)
      .json({ error: err.message || "Something went wrong with the request" });
  }
}

export async function deleteAllEntries(req, res) {
  try {
    await Entry.destroy({ where: {} });
    return res.status(204);
  } catch (err) {
    res
      .status(400)
      .json({ error: err.message || "Something went wrong with the request" });
  }
}

export async function getEntryTasks(req, res) {
  const { id } = req.params;
  try {
    const entry = await Entry.findByPk(id);
    const tasks = await entry.getTasks();
    res.status(200).json(tasks);
  } catch (err) {
    res
      .status(404)
      .json({ error: err.message || "Something went wrong with the request" });
  }
}

export async function getEntryProjects(req, res) {
  const { id } = req.params;
  try {
    const entry = await Entry.findByPk(id);
    const projects = await entry.getProjects();
    res.status(200).json(projects);
  } catch (err) {
    res
      .status(404)
      .json({ error: err.message || "Something went wrong with the request" });
  }
}