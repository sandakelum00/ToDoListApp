const asyncHandler = require("express-async-handler");
const res = require("express/lib/response");
const Task = require("../models/taskModel");

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
});

const createTask = asyncHandler(async (req, res) => {
  const { title, description, tdDate } = req.body;

  if (!title || !description || !tdDate) {
    res.status(400);
    throw new Error("Please fill all the fields");
  } else {
    const task = new Task({ user: req.user._id, title, description, tdDate });

    const createdTask = await task.save();

    res.status(201).json(createdTask);
  }
});

const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

const updateTask = asyncHandler(async (req, res) => {
  const { title, description, tdDate } = req.body;

  const task = await Task.findById(req.params.id);

  if (task.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (task) {
    task.title = title;
    task.description = description;
    task.tdDate = tdDate;

    const updatedTask = await task.save();
    res.json(updateTask);
  } else {
    res.status(404);
    throw new Error("Task not found");
  }
});

const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (task) {
    await task.remove();
    res.json({ message: "Task Deleted" });
  } else {
    res.status(404);
    throw new Error("Task not found");
  }
});

module.exports = { getTasks, createTask, getTaskById, updateTask, deleteTask };
