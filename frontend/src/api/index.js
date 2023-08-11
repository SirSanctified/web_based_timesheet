import axios from "axios";

const BASE_URL = "http://localhost:4500/api"

export const api = axios.create({
  baseURL: BASE_URL,
});

export const axioPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});


export const loginUser = async (payload) => {
  try {
    const response = await api.post(`/login`, payload, { withCredentials: true, headers: { 'Content-Type': 'application/json' } });
    return response.data;
  } catch (err) {
    if (err.response) {
      return { error: err.response.data.message };
    }
    return { error: err.message };
  }
};

export const logoutUser = async (id) => {
  try {
    await api.post(`/logout/${id}`);
  } catch (err) {
    return { error: err.message };
  }
};

export const insertEmployee = async (payload) => {
  try {
    await api.post(`/employees`, payload);
  } catch (err) {
    return err.message;
  }
};

export const getAllEmployees = async (axiosInstance) => {
  try {
    const response = await axiosInstance.get(`/employees`);
    return response.data;
  } catch (err) {
    return err.message;
  }
};
export const updateEmployeeById = (id, payload) =>
  api.put(`/employee/${id}`, payload);
export const deleteEmployeeById = (id) => api.delete(`/employee/${id}`);
export const getEmployeeById = (id) => api.get(`/employee/${id}`);
export const getEmployeeProjects = (id) => api.get(`/employee/${id}/projects`);
export const getEmployeeTasks = (id) => api.get(`/employee/${id}/tasks`);
export const getEmployeeTimesheets = (id) =>
  api.get(`/employee/${id}/timesheets`);

export const insertProject = async (payload) => {
  try {
    await api.post(`/projects`, payload);
  } catch (err) {
    return err.message;
  }
};
export const getAllProjects = () => api.get(`/projects`);
export const updateProjectById = (id, payload) =>
  api.put(`/project/${id}`, payload);
export const deleteProjectById = (id) => api.delete(`/project/${id}`);
export const getProjectById = (id) => api.get(`/project/${id}`);
export const getProjectEmployees = (id) => api.get(`/project/${id}/employees`);
export const getProjectTasks = (id) => api.get(`/project/${id}/tasks`);

export const insertTask = async (payload) => {
  try {
    await api.post(`/tasks`, payload);
  } catch (err) {
    return err.message;
  }
};
export const getAllTasks = () => api.get(`/tasks`);
export const updateTaskById = (id, payload) => api.put(`/task/${id}`, payload);
export const deleteTaskById = (id) => api.delete(`/task/${id}`);
export const getTaskById = (id) => api.get(`/task/${id}`);
export const getTaskEmployees = (id) => api.get(`/task/${id}/employees`);
export const getTaskComments = (id) => api.get(`/task/${id}/comments`);

export const insertTimesheet = async (axiosInstance,payload) => {
  try {
    const response = await axiosInstance.post(`/timesheets`, payload);
    return response.data;
  } catch (err) {
    return err.message;
  }
};
export const getAllTimesheets = async(axiosInstance) => {
  try{
  const response = await axiosInstance.get(`/timesheets`);
  return response.data;
  } catch(error) {
    return { error: error?.response?.error || error.message };
  }
}

export const updateTimesheetById = (id, payload) =>
  api.put(`/timesheet/${id}`, payload);
export const deleteTimesheetById = async (id) => {
  try {
    await api.delete(`/timesheet/${id}`);
  } catch (error) {
    return error.message;
  }
};
export const getTimesheetById = async (id) => {
  try {
    const response = await api.get(`/timesheet/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const deleteAllTimesheets = () => api.delete(`/timesheets`);

export const insertComment = async (payload) => {
  try {
    await api.post(`/comments`, payload);
  } catch (err) {
    return err.message;
  }
};
export const getAllComments = () => api.get(`/comments`);
export const updateCommentById = (id, payload) =>
  api.put(`/comment/${id}`, payload);
export const deleteCommentById = (id) => api.delete(`/comment/${id}`);
export const getCommentById = (id) => api.get(`/comment/${id}`);
export const getCommentsByEmployee = (id) =>
  api.get(`/comments/employee/${id}`);
export const getCommentsByTask = (id) => api.get(`/comments/task/${id}`);
export const getCommentsByEmployeeAndTask = (employeeId, taskId) =>
  api.get(`/comments/employee/${employeeId}/task/${taskId}`);
