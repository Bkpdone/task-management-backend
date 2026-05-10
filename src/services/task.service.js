const mongoose = require("mongoose");
const Task = require("../models/task.model");
const ApiError = require("../utils/ApiError");

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const createTask = async (userId, data) => {
  return Task.create({ ...data, user: userId });
};

const listTasks = async (userId) => {
  return Task.find({ user: userId }).sort({ createdAt: -1 });
};

const updateTask = async (userId, taskId, data) => {
  if (!isValidId(taskId)) {
    throw new ApiError(400, "Invalid task id");
  }

  const update = { ...data };
  if (Object.keys(update).length === 0) {
    update.status = "completed";
  }

  const task = await Task.findOneAndUpdate(
    { _id: taskId, user: userId },
    update,
    { new: true, runValidators: true }
  );

  if (!task) {
    throw new ApiError(404, "Task not found");
  }
  return task;
};

const deleteTask = async (userId, taskId) => {
  if (!isValidId(taskId)) {
    throw new ApiError(400, "Invalid task id");
  }

  const task = await Task.findOneAndDelete({ _id: taskId, user: userId });
  if (!task) {
    throw new ApiError(404, "Task not found");
  }
  return task;
};

module.exports = { createTask, listTasks, updateTask, deleteTask };
