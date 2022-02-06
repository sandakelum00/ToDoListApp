const express = require("express");
const {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/tasksController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getTasks);
router.route("/create").post(protect, createTask);
router
  .route("/:id")
  .get(getTaskById)
  .put(protect, updateTask)
  .delete(protect, deleteTask);

module.exports = router;
