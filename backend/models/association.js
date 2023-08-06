import Employee from "./employee.js";
import Project from "./project.js";
import Task from "./task.js";
import Comment from "./comment.js";
import Timesheet from "./timesheet.js";
import Entry from "./entry.js";

// create associations between models.
// Employee and Project

Employee.belongsToMany(Project, {
  onDelete: "CASCADE",
  through: "employee_projects",
});

Project.belongsToMany(Employee, {
  onDelete: "CASCADE",
  through: "employee_projects",
});

// Employee and Task

Employee.belongsToMany(Task, {
  onDelete: "CASCADE",
  through: "employee_tasks",
});

Task.belongsToMany(Employee, {
  onDelete: "CASCADE",
  through: "employee_tasks",
});

// Project and Task

Project.belongsToMany(Task, { onDelete: "CASCADE", through: "project_tasks" });

Task.belongsTo(Project, { onDelete: "CASCADE", through: "project_tasks" });

// Task and Comment

Task.belongsToMany(Comment, { onDelete: "CASCADE", through: "task_comments" });

Comment.belongsTo(Task, { onDelete: "CASCADE", through: "task_comments" });

// Employee and Comment

Employee.belongsToMany(Comment, {
  onDelete: "CASCADE",
  through: "employee_comments",
});

Comment.belongsTo(Employee, {
  onDelete: "CASCADE",
  through: "employee_comments",
});

// Timesheet and Comment

Timesheet.belongsToMany(Comment, {
  onDelete: "CASCADE",
  through: "timesheet_comments",
});

Comment.belongsTo(Timesheet);

// Employee and Timesheet

Employee.belongsToMany(Timesheet, {
  through: "employee_timesheets",
});

Timesheet.belongsTo(Employee, {
  onDelete: "CASCADE",
  through: "employee_timesheets",
});

// Employee and Entry

Employee.belongsToMany(Entry, {
  onDelete: "CASCADE",
  through: "employee_entries",
});

Entry.belongsTo(Employee, {
  through: "employee_entries",
});

// Timesheet and Entry

Timesheet.belongsToMany(Entry, {
  through: "timesheet_entries",
  onDelete: "CASCADE",
});

Entry.belongsTo(Timesheet, {
  through: "timesheet_entries",
});

// Entry and Task

Entry.belongsToMany(Task, {
  through: "entry_tasks",
  onDelete: "CASCADE",
});

Task.belongsTo(Entry);

// Entry and Project

Entry.belongsToMany(Project, {
  through: "entry_projects",
  onDelete: "CASCADE",
});

Project.belongsTo(Entry);

export { Employee, Project, Entry, Task, Comment, Timesheet };
