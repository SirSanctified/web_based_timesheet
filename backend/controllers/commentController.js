import { Comment } from "../models/association.js";
import { v4 as uuidv4 } from "uuid";
import { sequelize } from "../config/db.js";

export const createComment = async (req, res) => {
  try {
    const { content, taskId, timesheetId } = req.body;
    await sequelize.sync({ force: false });
    const newComment = await Comment.create({
      id: uuidv4(),
      content,
      employeeId: req.user.id,
      taskId: taskId || null,
      timesheetId: timesheetId || null,
    });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.status(200).json(comments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findOne({ where: { id: req.params.id } });
    res.status(200).json(comment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { content, employeeId, taskId } = req.body;
    const updatedComment = await Comment.update(
      {
        content,
        employeeId,
        taskId,
      },
      { where: { id: req.params.id } }
    );
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    await Comment.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "Comment deleted successfully." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCommentsByTask = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { taskId: req.params.id },
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCommentsByEmployee = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { employeeId: req.params.id },
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCommentsByEmployeeAndTask = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { employeeId: req.params.employeeId, taskId: req.params.taskId },
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
