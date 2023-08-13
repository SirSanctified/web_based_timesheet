import Employee from "./employee.js";
import Project from "./project.js";
import Task from "./task.js";
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

Task.belongsToMany(Entry, {
  through: "entry_tasks",
  foreignKey: "entryId",
  otherKey: "taskId",
  onDelete: "CASCADE"
});

Entry.belongsTo(Task, {
  through: "entry_tasks",
  foreignKey: "taskId",
  otherKey: "entryId",
});


// Entry and Project

Project.belongsToMany(Entry, {
  through: "project_entries",
  foreignKey: "entryId",
  otherKey: "projectId",
  onDelete: "CASCADE"
});

Entry.belongsTo(Project, {
  through: "entry_projects",
  foreignKey: "projectId",
  otherKey: "entryId",
});

export { Employee, Project, Entry, Task, Timesheet };
