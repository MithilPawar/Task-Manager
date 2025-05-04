import API from "../utils/axiosInstance";

// Create a new task
export const createTask = async (taskData) => {
  try {
    const res = await API.post("/tasks", taskData);
    return res.data.data;
  } catch (error) {
    console.error("Error in task creation:", error.response || error);
    throw error.response ? error.response.data : error;
  }
};

// Get a task by ID
export const getTaskById = async (taskId) => {
  try {
    const res = await API.get(`/tasks/${taskId}`);
    return res.data.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Get all tasks
export const getAllTask = async () => {
  try {
    const res = await API.get("/tasks");
    return res.data.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Update a task
export const updateTask = async (taskId, taskData) => {
  try {
    const res = await API.put(`/tasks/${taskId}`, taskData);
    return res.data.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Delete a task
export const deleteTask = async (taskId) => {
  try {
    const res = await API.delete(`/tasks/${taskId}`);
    return res.data.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
