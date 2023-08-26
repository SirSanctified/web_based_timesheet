import { v4 as uuidv4 } from "uuid";
import {
  Timesheet,
  Entry,
  Employee,
  Task,
  Project,
} from "../models/association.js";
import { sequelize } from "../config/db.js";
import { where } from "sequelize";

// Create and Save a new Timesheet
export const createTimesheet = async (req, res) => {
  // Create a Timesheet
  if (!req.body.employeeId)
    return res.status(400).json({ error: "Employee required" });
  const timesheet = {
    id: uuidv4(),
    date: Date.parse(req.body.date) || Date.now(),
    hours: req.body.hours,
    employeeId: req.body.employeeId,
  };

  // Save Timesheet in the database
  try {
    await sequelize.sync({ force: false });
    const data = await Timesheet.create(timesheet);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({
      message:
        err.message || "Some error occurred while creating the Timesheet.",
    });
  }
};

// Retrieve all Timesheets from the database.
export const getTimesheets = async (req, res) => {
  try {
    if (req.user.role === "admin" || req.user.role === "approver") {
      const data = await Timesheet.findAll({
        include: {
          model: Employee,
          attributes: { exclude: ["password", "resetToken", "refreshToken"] },
        },
      });
      res.status(200).json(data);
    } else {
      const data = await Timesheet.findAll({
        where: { employeeId: req.user.id },
        include: {
          model: Employee,
          attributes: { exclude: ["password", "resetToken", "refreshToken"] },
        },
      });
      res.status(200).json(data);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message:
        err.message || "Some error occurred while retrieving timesheets.",
    });
  }
};

// Find a single Timesheet with an id
export const getTimesheetById = async (req, res) => {
  const id = req.params.id;
  try {
    if (req.user.role === "admin" || req.user.role === "approver") {
      const data = await Timesheet.findByPk(id, {
        include: [
          {
            model: Employee,
            attributes: { exclude: ["password", "resetToken", "refreshToken"] },
          },
        ],
      });
      const Entries = await Entry.findAll({
        where: { timesheetId: data.id },
        include: [
          {
            model: Task,
          },
          { model: Project },
        ],
      });
      res.status(200).json({ ...data.dataValues, Entries: Entries });
    } else {
      const data = await Timesheet.findByPk(id, {
        where: { employeeId: req.user.id },
        include: [
          {
            model: Employee,
            attributes: { exclude: ["password", "resetToken", "refreshToken"] },
          },
        ],
      });
      const Entries = await Entry.findAll({
        where: { timesheetId: data.id },
        include: [
          {
            model: Task,
          },
          { model: Project },
        ],
      });
      res.status(200).json({ ...data.dataValues, Entries: Entries });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving Timesheet with id=" + id,
    });
  }
};

// Update a Timesheet by the id in the request
export const updateTimesheet = async (req, res) => {
  const id = req.params.id;
  const { date, hours, employeeId } = req.body;

  try {
    const timesheet = await Timesheet.findByPk(id);
    if (req.user.role === "admin" || req.user.id === timesheet.employeeId) {
      await Timesheet.update({ date, hours, employeeId }, { where: { id } });
    } else {
      res
        .status(403)
        .json({ error: "You are not allowed to edit this timesheet." });
    }
    res.status(200).json({
      message: "Timesheet was updated successfully.",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating Timesheet with id=" + id,
    });
  }
};

// Delete a Timesheet with the specified id in the request
export const deleteTimesheet = async (req, res) => {
  const id = req.params.id;

  try {
    const timesheet = Timesheet.findByPk(id);
    if (req.user.role === "admin" || req.user.id === timesheet.employeeId) {
      await Timesheet.destroy({
        where: { id: id },
      });
    } else {
      res
        .status(403)
        .json({ error: "You are not allowed to edit this timesheet." });
    }
    res.status(200).json({
      message: "Timesheet was deleted successfully!",
    });
  } catch (err) {
    res.status(500).json({
      message: "Could not delete Timesheet with id=" + id,
    });
  }
};

// Delete all Timesheets from the database.
export const deleteAllTimesheets = async (req, res) => {
  try {
    const data = await Timesheet.destroy({
      where: {},
      truncate: false,
    });
    res.status(200).json({
      message: `${data} Timesheets were deleted successfully!`,
    });
  } catch (err) {
    res.status(500).json({
      message:
        err.message || "Some error occurred while removing all timesheets.",
    });
  }
};

export const approveTimesheet = async (req, res) => {
  const { status } = req.body;
  try {
    if (req.user.role !== "admin" || req.user.role !== "approver") {
      res
        .status(403)
        .json({ error: "You are not allowed to edit this timesheet." });
    }
    const timesheet = await Timesheet.findByPk(req.params.id);

    if (timesheet.employeeId === req.user.id)
      return res.status(403).json({ message: "Cannot approve yourself" });
    timesheet.status = status;
    console.log(status);
    await timesheet.save();
    res.status(200).json({ message: "Timesheet successifully approved!" });
  } catch (error) {
    console.log(error);
    res
      .status(409)
      .json({ error: error.message || "Cannot approve timesheet." });
  }
};
