const Todo = require("../models/todo");

async function createTodo(req, res) {
    try {
        const { title, description = "", status = "pending" } = req.body;

        const todo = await Todo.create({
            title,
            description,
            status,
            completed: status === "completed",
            user: req.user.id
        });

        return res.status(201).json(todo);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

async function getTodos(req, res) {
    try {
        const todos = await Todo.find({ user: req.user.id });

        // Keep older documents compatible with the frontend.
        const normalized = todos.map((todo) => {
            const item = todo.toObject();
            if (!item.status) item.status = item.completed ? "completed" : "pending";
            if (typeof item.description !== "string") item.description = "";
            return item;
        });

        return res.status(200).json(normalized);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

async function updateTodo(req, res) {
    try {
        const { id } = req.params;
        const data = { ...req.body };

        if (data.status) {
            data.completed = data.status === "completed";
        } else if (typeof data.completed === "boolean") {
            data.status = data.completed ? "completed" : "pending";
        }

        const todo = await Todo.findOneAndUpdate(
            {
                _id: id,
                user: req.user.id
            },
            data,
            {
                new: true,
                runValidators: true
            }
        );

        if (!todo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        return res.status(200).json(todo);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

async function deleteTodo(req, res) {
    try {
        const { id } = req.params;

        const todo = await Todo.findOneAndDelete({
            _id: id,
            user: req.user.id
        });

        if (!todo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Todo deleted successfully"
        });
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: err.message
        });
    }
}

module.exports = {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo
};
