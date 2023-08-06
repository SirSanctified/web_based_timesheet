import Employee from "./employee.js";
import Project from "./project.js";
import Task from "./task.js";
import Comment from "./comment.js";
import Timesheet from "./timesheet.js";
import Entry from "./entry.js";

// create associations between models.
// Employee and Project

Employee.belongsToMany(Project, {
  through: "employee_projects",
  foreignKey: "projectId",
  otherKey: "employeeId",
  onDelete: "CASCADE"
});

Project.belongsToMany(Employee, {
  through: "employee_projects",
  foreignKey: "employeeId",
  otherKey: "projectId",
});

// Employee and Task

Employee.belongsToMany(Task, {
  through: "employee_tasks",
  foreignKey: "taskId",
  otherKey: "employeeId",
  onDelete: "CASCADE"
});

Task.belongsToMany(Employee, {
  through: "employee_tasks",
  foreignKey: "employeeId",
  otherKey: "taskId",
});

// Project and Task

Project.belongsToMany(Task, {
  through: "project_tasks",
  foreignKey: "taskId",
  otherKey: "projectId",
  onDelete: "CASCADE"
});

Task.belongsTo(Project, {
  through: "project_tasks",
  foreignKey: "projectId",
  otherKey: "taskId",
});

// Task and Comment

Task.belongsToMany(Comment, {
  through: "task_comments",
  foreignKey: "commentId",
  otherKey: "taskId",
  onDelete: "CASCADE"
});

Comment.belongsTo(Task, {
  through: "task_comments",
  foreignKey: "taskId",
  otherKey: "commentId",
});

// Employee and Comment

Employee.belongsToMany(Comment, {
  through: "employee_comments",
  foreignKey: "commentId",
  otherKey: "employeeId",
  onDelete: "CASCADE"
});

Comment.belongsTo(Employee, {
  through: "employee_comments",
  foreignKey: "employeeId",
  otherKey: "commentId",
});

// Timesheet and Comment

Timesheet.belongsToMany(Comment, {
  through: "timesheet_comments",
  foreignKey: "commentId",
  otherKey: "timesheetId",
  onDelete: "CASCADE"
});

Comment.belongsTo(Timesheet, {
  through: "timesheet_comments",
  foreignKey: "timesheetId",
  otherKey: "commentId",
});

// Employee and Timesheet

Employee.belongsToMany(Timesheet, {
  through: "employee_timesheets",
  foreignKey: "timesheetId",
  otherKey: "employeeId",
  onDelete: "CASCADE"
});

Timesheet.belongsTo(Employee, {
  through: "employee_timesheets",
  foreignKey: "employeeId",
  otherKey: "timesheetId",
});

// Employee and Entry

Employee.belongsToMany(Entry, {
  through: "employee_entries",
  foreignKey: "entryId",
  otherKey: "employeeId",
  onDelete: "CASCADE"
});

Entry.belongsTo(Employee, {
  through: "employee_entries",
  foreignKey: "employeeId",
  otherKey: "entryId",
});

// Timesheet and Entry

Timesheet.belongsToMany(Entry, {
  through: "timesheet_entries",
  foreignKey: "entryId",
  otherKey: "timesheetId",
  onDelete: "CASCADE"
});

Entry.belongsTo(Timesheet, {
  through: "timesheet_entries",
  foreignKey: "timesheetId",
  otherKey: "entryId",
});

// Entry and Task

Entry.belongsToMany(Task, {
  through: "entry_tasks",
  foreignKey: "taskId",
  otherKey: "entryId",
  onDelete: "CASCADE"
});

Task.belongsTo(Entry, {
  through: "entry_tasks",
  foreignKey: "entryId",
  otherKey: "taskId",
});

// Entry and Project

Entry.belongsToMany(Project, {
  through: "entry_projects",
  foreignKey: "projectId",
  otherKey: "entryId",
  onDelete: "CASCADE"
});

Project.belongsTo(Entry, {
  through: "entry_projects",
  foreignKey: "entryId",
  otherKey: "projectId",
});

export { Employee, Project, Entry, Task, Comment, Timesheet };
