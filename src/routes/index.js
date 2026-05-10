const express = require("express");
const authRoutes = require("./auth.routes");
const taskRoutes = require("./task.routes");

const router = express.Router();

router.use("/user", authRoutes);
router.use("/task", taskRoutes);

module.exports = router;
