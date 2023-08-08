import { Entry } from "../models/association.js";
import { sequelize } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

export const createEntry = async (req, res) => {
  const { date, hours, timesheetId, taskId, projectId } = req.body;
  try {
    await sequelize.sync({ force: true });
    await Entry.create({
      id: uuidv4(),
      date,
      hours,
      timesheetId,
      taskId,
      projectId,
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
  const { hours, date, timesheetId, taskId, projectId } = req.body;
  try {
    const updatedEntry = await Entry.update(
      { hours, date, timesheetId, taskId, projectId },
      { where: { id } }
    );
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
