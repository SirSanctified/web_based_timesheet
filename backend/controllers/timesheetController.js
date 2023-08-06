import { v4 as uuidv4 } from "uuid";
import { Timesheet } from "../models/association.js";
import { sequelize } from "../config/db.js";

// Create and Save a new Timesheet
export const createTimesheet = async (req, res) => {
  // Create a Timesheet
  const timesheet = {
    id: uuidv4(),
    date: req.body.date,
    hours: req.body.hours,
    employeeId: req.body.employeeId,
    projectId: req.body.projectId,
    total: req.body.total,
  };

  // Save Timesheet in the database
  try {
    await sequelize.sync({ force: true });
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
    const data = await Timesheet.findAll();
    res.status(200).json(data);
  } catch (err) {
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
    const data = await Timesheet.findByPk(id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving Timesheet with id=" + id,
    });
  }
};

// Update a Timesheet by the id in the request
export const updateTimesheet = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Timesheet.update(req.body, {
      where: { id: id },
    });
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
    const data = await Timesheet.destroy({
      where: { id: id },
    });
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
}
