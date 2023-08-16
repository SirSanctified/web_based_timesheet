import axios from "axios";

const BASE_URL = "http://localhost:3500/api";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
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
    const response = await api.post(`/login`, payload);
    return response.data;
  } catch (err) {
    if (err.response) {
      return { error: err.response.data.message };
    }
    return { error: err.message };
  }
};

export const logoutUser = async (axiosInstance, id) => {
  try {
    await axiosInstance.post(`/logout/${id}`);
  } catch (err) {
    return { error: err.message };
  }
};

export const registerUser = async (axiosInstance, payload) => {
  try {
    await axiosInstance.post(`/register`, payload);
  } catch (err) {
    return { error: err.message };
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

export const updateEmployeeById = async (axiosInstance, id, payload) => {
  try {
    const response = axiosInstance.put(`/employees/${id}`, payload);
    return response.data;
  } catch (err) {
    return err.message;
  }
};

export const deleteEmployeeById = async (axiosInstance, id) => {
  try {
    await axiosInstance.delete(`/employees/${id}`);
  } catch (err) {
    return err.message;
  }
};

export const getEmployeeById = async (axiosInstance, id) => {
  try {
    const response = await axiosInstance.get(`/employees/${id}`);
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

export const getAllProjects = async (axiosInstance) => {
  try {
    const response = await axiosInstance.get(`/projects`);
    return response.data;
  } catch (error) {
    return { error: error?.response?.error || error.message };
  }
};

export const updateProjectById = async (axiosInstance, id, payload) => {
  try {
    const response = await axiosInstance.put(`/projects/${id}`, payload);
    return response.data;
  } catch (error) {
    return { error: error?.response?.error || error.message };
  }
};

export const deleteProjectById = async (axiosInstance, id) => {
  try {
    await axiosInstance.delete(`/projects/${id}`);
  } catch (error) {
    return { error: error?.response?.error || error.message };
  }
};

export const getProjectById = async (axiosInstance, id) => {
  try {
    const response = await axiosInstance.get(`/projects/${id}`);
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

export const getAllTasks = async (axiosInstance) => {
  try {
    const response = await axiosInstance.get(`/tasks`);
    return response.data;
  } catch (error) {
    return { error: error?.response?.error || error.message };
  }
};

export const updateTaskById = async (axiosInstance, id, payload) => {
  try {
    const response = await axiosInstance.put(`/tasks/${id}`, payload);
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const deleteTaskById = async (axiosInstance, id) => {
  try {
    const response = await axiosInstance.delete(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const getTaskById = async (axiosInstance, id) => {
  try {
    const response = await axiosInstance.get(`/tasks/${id}`);
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

export const approveTimesheet = async (axiosInstance, id, payload) => {
  try {
    const response = await axiosInstance.put(
      `/timesheets/approve/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    return {
      error:
        error?.response.error ||
        "An error occured while processing your request.",
    };
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

export const insertRequest = async (payload) => {
  try {
    const response = await api.post(`/requests`, payload);
    return response.data;
  } catch (err) {
    return err.message;
  }
};

export const getAllRequests = async (axiosInstance) => {
  try {
    const response = await axiosInstance.get(`/requests`);
    return response.data;
  } catch (error) {
    return { error: error?.response?.error || error.message };
  }
};

export const getRequestById = async (axiosInstance, id) => {
  try {
    const response = await axiosInstance.get(`/requests/${id}`);
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const deleteRequestById = async (axiosInstance, id) => {
  try {
    await axiosInstance.delete(`/requests/${id}`);
  } catch (error) {
    return { error: error.message };
  }
};
