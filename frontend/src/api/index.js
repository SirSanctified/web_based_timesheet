import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3500/api',
});

export const insertEmployee = (payload) => api.post(`/employees`, payload);
export const getAllEmployees = () => api.get(`/employees`);
export const updateEmployeeById = (id, payload) => api.put(`/employee/${id}`, payload);
export const deleteEmployeeById = (id) => api.delete(`/employee/${id}`);
export const getEmployeeById = (id) => api.get(`/employee/${id}`);
export const getEmployeeProjects = (id) => api.get(`/employee/${id}/projects`);
export const getEmployeeTasks = (id) => api.get(`/employee/${id}/tasks`);
export const getEmployeeTimesheets = (id) => api.get(`/employee/${id}/timesheets`);

export const insertProject = (payload) => api.post(`/projects`, payload);
export const getAllProjects = () => api.get(`/projects`);
export const updateProjectById = (id, payload) => api.put(`/project/${id}`, payload);
export const deleteProjectById = (id) => api.delete(`/project/${id}`);
export const getProjectById = (id) => api.get(`/project/${id}`);
export const getProjectEmployees = (id) => api.get(`/project/${id}/employees`);
export const getProjectTasks = (id) => api.get(`/project/${id}/tasks`);

export const insertTask = (payload) => api.post(`/tasks`, payload);
export const getAllTasks = () => api.get(`/tasks`);
export const updateTaskById = (id, payload) => api.put(`/task/${id}`, payload);
export const deleteTaskById = (id) => api.delete(`/task/${id}`);
export const getTaskById = (id) => api.get(`/task/${id}`);
export const getTaskEmployees = (id) => api.get(`/task/${id}/employees`);
export const getTaskComments = (id) => api.get(`/task/${id}/comments`);

export const insertTimesheet = (payload) => api.post(`/timesheets`, payload);
export const getAllTimesheets = () => api.get(`/timesheets`);
export const updateTimesheetById = (id, payload) => api.put(`/timesheet/${id}`, payload);
export const deleteTimesheetById = (id) => api.delete(`/timesheet/${id}`);
export const getTimesheetById = (id) => api.get(`/timesheet/${id}`);
export const deleteAllTimesheets = () => api.delete(`/timesheets/deleteAll`);

export const insertComment = (payload) => api.post(`/comments`, payload);
export const getAllComments = () => api.get(`/comments`);
export const updateCommentById = (id, payload) => api.put(`/comment/${id}`, payload);
export const deleteCommentById = (id) => api.delete(`/comment/${id}`);
export const getCommentById = (id) => api.get(`/comment/${id}`);
export const getCommentsByEmployee = (id) => api.get(`/comments/employee/${id}`);
export const getCommentsByTask = (id) => api.get(`/comments/task/${id}`);
export const getCommentsByEmployeeAndTask = (employeeId, taskId) => api.get(`/comments/employee/${employeeId}/task/${taskId}`);

