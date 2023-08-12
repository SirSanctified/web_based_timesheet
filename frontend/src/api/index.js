import axios from "axios";

const BASE_URL = "http://localhost:4500/api";

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
    const response = await api.post(`/login`, payload, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
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
export const updateEmployeeById = async(axiosInstance,id, payload) => {
  try {
    const response = axiosInstance.put(`/employee/${id}`, payload);
    return response.data;
  } catch (err) {
    return err.message;
  }
};
export const deleteEmployeeById = async(axiosInstance, id) => {
  try {
    await axiosInstance.delete(`/employee/${id}`);
  } catch (err) {
    return err.message;
  }
};
export const getEmployeeById = async(axiosInstance, id) => {
  try {
    const response = await axiosInstance.get(`/employee/${id}`);
    return response.data;
  } catch (err) {
    return err.message;
  }
};
export const getEmployeeProjects = async(axiosInstance, id) => {
  try {
    const response = await axiosInstance.get(`/employee/${id}/projects`);
    return response.data;
  } catch (err) {
    return err.message;
  }
};

export const getEmployeeTasks = async(axiosInstance, id) => {
  try {
    const response = await axiosInstance.get(`/employee/${id}/tasks`);
    return response.data;
  } catch (err) {
    return err.message;
  }
};

export const getEmployeeTimesheets = async(axiosInstance, id) => {
  try {
    const response = await axiosInstance.get(`/employee/${id}/timesheets`);
    return response.data;
  } catch (err) {
    return err.message;
  }
};

export const insertProject = async (axiosInstance, payload) => {
  try {
    await axiosInstance.post(`/projects`, payload);
  } catch (err) {
    return err.message;
  }
};
export const getAllProjects = async(axiosInstance) => {
  try{
    const response = await axiosInstance.get(`/projects`);
    return response.data;
  } catch (error) {
    return { error: error?.response?.error || error.message };
  }
};

export const updateProjectById = async(axiosInstance, id, payload) => {
  try {
    const response = await axiosInstance.put(`/project/${id}`, payload);
    return response.data;
  } catch (error) {
    return { error: error?.response?.error || error.message };
  }
};
export const deleteProjectById = async(axiosInstance, id) => {
  try{
    await axiosInstance.delete(`/project/${id}`);
  } catch (error) {
    return { error: error?.response?.error || error.message };
  }
};

export const getProjectById = async(axiosInstance, id) => {
  try {
    const response = await axiosInstance.get(`/project/${id}`);
    return response.data;
  } catch (error) {
    return { error: error?.response?.error || error.message };
  }
};

export const getProjectEmployees = async(axiosInstance, id) => {
  try {
    const response = await axiosInstance.get(`/project/${id}/employees`);
    return response.data;
  } catch (error) {
    return { error: error?.response?.error || error.message };
  }
};

export const getProjectTasks = async (axiosInstance, id) => {
  try {
    const response = await axiosInstance.get(`/project/${id}/tasks`);
    return response.data;
  } catch (error) {
    return { error: error?.response?.error || error.message };
  }
};

export const insertTask = async (axiosInstance, payload) => {
  try {
    await axiosInstance.post(`/tasks`, payload);
  } catch (err) {
    return err.message;
  }
};
export const getAllTasks = async(axiosInstance) => {
  try {
    const response = await axiosInstance.get(`/tasks`);
    return response.data;
  } catch (error) {
    return { error: error?.response?.error || error.message };
  }
};

export const updateTaskById = async(axiosInstance, id, payload) => {
  try {
    const response = await axiosInstance.put(`/task/${id}`, payload);
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const deleteTaskById = async(axiosInstance, id) => {
  try {
    const response = await axiosInstance.delete(`/task/${id}`);
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const getTaskById = async(axiosInstance, id) => {
  try {
    const response = await axiosInstance.get(`/task/${id}`);
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const getTaskEmployees = async(axiosinstance, id) => {
  try {
    const response = await axiosinstance.get(`/task/${id}/employees`);
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const getTaskComments = async(axiosInstance, id) => {
  try {
    const response = await axiosInstance.get(`/task/${id}/comments`);
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const insertTimesheet = async (axiosInstance, payload) => {
  try {
    const response = await axiosInstance.post(`/timesheets`, payload);
    return response.data;
  } catch (err) {
    return err.message;
  }
};
export const getAllTimesheets = async (axiosInstance) => {
  try {
    const response = await axiosInstance.get(`/timesheets`);
    return response.data;
  } catch (error) {
    return { error: error?.response?.error || error.message };
  }
};

export const updateTimesheetById = (axiosInstance, id, payload) => {
  try {
    const response = axiosInstance.put(`/timesheets/${id}`, payload);
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const deleteTimesheetById = async (axiosInstance, id) => {
  try {
    await axiosInstance.delete(`/timesheets/${id}`);
  } catch (error) {
    return { error: error.message };
  }
};

export const getTimesheetById = async (axiosInstance, id) => {
  try {
    const response = await axiosInstance.get(`/timesheets/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const deleteAllTimesheets = async (axiosInstance) => {
  try {
    axiosInstance.delete(`/timesheets`);
  } catch (error) {
    return { error: error.message };
  }
};

export const insertEntry = async (axiosInstance, payload) => {
  try {
    const response = await axiosInstance.post(`/entries`, payload);
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const getAllEntries = async (axiosInstance) => {
  try {
    const response = await axiosInstance.get(`/entries`);
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const updateEntryById = async (axiosInstance, id, payload) => {
  try {
    const response = await axiosInstance.put(`/entries/${id}`, payload);
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const deleteEntryById = async (axiosInstance, id) => {
  try {
    await axiosInstance.delete(`/entries/${id}`);
  } catch (error) {
    return { error: error.message };
  }
};

export const getEntryById = async (axiosInstance, id) => {
  try {
    const response = await axiosInstance.get(`/entries/${id}`);
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

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
