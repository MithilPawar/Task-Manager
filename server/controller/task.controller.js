import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Task } from "../model/task.model.js";

// ✅ Create a new Task
const createTask = asyncHandler(async (req, res) => {
  const { title, description, status } = req.body;
  const userId = req.user?._id;

  console.log("Request Body:", req.body);

  if (!title || title.trim() === "") {
    throw new ApiError(400, "Title is required!");
  }

  const addTask = await Task.create({
    title,
    description,
    status,
    user: userId,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, addTask, "Task added successfully"));
});

// ✅ Get All Tasks for a User
const getAllTask = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const tasks = await Task.find({ user: userId });

  return res
    .status(200)
    .json(new ApiResponse(200, tasks, "Tasks fetched successfully"));
});

// ✅ Get Task by ID
const getTaskById = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const userId = req.user?._id;

  const task = await Task.findOne({ _id: taskId, user: userId });

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task fetched successfully"));
});

// ✅ Update Task
const updateTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { title, description, status } = req.body;
  const userId = req.user?._id;

  const updateFieleds = {};

  if (title !== undefined) updateFieleds.title = title;
  if (description !== undefined) updateFieleds.description = description;
  if (status !== undefined) updateFieleds.status = status;

  if (Object.keys(updateFieleds).length === 0) {
    throw new ApiError(404, "No valid field for updation");
  }

  const task = await Task.findOneAndUpdate(
    { _id: taskId, user: userId },
    {
      $set: updateFieleds,
    },
    { new: true }
  );

  if (!task) {
    throw new ApiError(404, "Task not found or update failed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task updated successfully"));
});

// ✅ Delete Task
const deleteTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const userId = req.user?._id;

  const task = await Task.findOneAndDelete({ _id: taskId, user: userId });

  if (!task) {
    throw new ApiError(404, "Task not found or deletion failed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Task deleted successfully"));
});

export { createTask, getAllTask, getTaskById, deleteTask, updateTask };
