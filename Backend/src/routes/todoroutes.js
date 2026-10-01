const express = require("express");
const router = express.Router();
const auth = require("../middleware/authmiddleware");
router.use (auth);

const { createTodo } = require("../Controllers/todocontroller");

router.post("/todos", createTodo);
const { getTodos } = require("../Controllers/todocontroller");
router.get("/todos", getTodos);
const { updateTodo } = require("../Controllers/todocontroller");
router.patch("/todos/:id", updateTodo);
const { deleteTodo } = require("../Controllers/todocontroller");
router.delete("/todos/:id", deleteTodo);

module.exports = router;
