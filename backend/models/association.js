import Employee from "./employee.js";
import Project from "./project.js";
import Task from "./task.js";
import Comment from "./comment.js";
import Timesheet from "./timesheet.js";

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

// Employee and Timesheet

Employee.belongsToMany(Timesheet, {
  through: "employee_timesheets",
});

Timesheet.belongsTo(Employee, {
  onDelete: "CASCADE",
  through: "employee_timesheets",
});

export { Employee, Project, Task, Comment, Timesheet };
