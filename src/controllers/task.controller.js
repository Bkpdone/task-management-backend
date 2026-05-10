const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const taskService = require("../services/task.service");

const createTask = asyncHandler(async (req, res) => {
  const task = await taskService.createTask(req.user.id, req.body);
  return res.status(201).json(new ApiResponse(201, task, "Task created"));
});

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await taskService.listTasks(req.user.id);
  return res.status(200).json(new ApiResponse(200, tasks, "Tasks fetched"));
});

const updateTask = asyncHandler(async (req, res) => {
  const task = await taskService.updateTask(req.user.id, req.params.id, req.body);
  return res.status(200).json(new ApiResponse(200, task, "Task updated"));
});

const deleteTask = asyncHandler(async (req, res) => {
  await taskService.deleteTask(req.user.id, req.params.id);
  return res.status(200).json(new ApiResponse(200, null, "Task deleted"));
});

module.exports = { createTask, getTasks, updateTask, deleteTask };
