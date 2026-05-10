const express = require("express");
const taskController = require("../controllers/task.controller");
const validate = require("../middleware/validate.middleware");
const authMiddleware = require("../middleware/auth.middleware");
const {
  createTaskSchema,
  updateTaskSchema,
  idParamSchema,
} = require("../validators/task.validator");

const router = express.Router();

router.use(authMiddleware);

router.post("/", validate(createTaskSchema), taskController.createTask);
router.get("/", taskController.getTasks);
router.patch("/:id", validate(updateTaskSchema), taskController.updateTask);
router.delete("/:id", validate(idParamSchema), taskController.deleteTask);

module.exports = router;
