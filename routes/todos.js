"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const todos = [];
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const newText = req.body && req.body.text;
    if (newText) {
        const newTodo = {
            id: new Date().toISOString(),
            text: req.body.text
        };
        todos.push(newTodo);
    }
    res.json({ todos: todos });
});
router.post('/delete/:id', (req, res, next) => {
    const todoId = +req.params.id;
    const index = todos.findIndex(todo => +todo.id == todoId);
    if (index !== -1) {
        todos.splice(index, 1);
        res.status(200).json({ message: 'Todo deleted successfully' });
    }
    else {
        res.status(404).json({ message: 'Todo not found' });
    }
});
router.post('/edit/:id', (req, res, next) => {
    const todoId = +req.params.id;
    const newText = req.body.newText;
    const todoIndex = todos.findIndex((todo) => +todo.id == todoId);
    if (todoIndex !== -1) {
        todos[todoIndex].text = newText;
        res.status(200).json({ message: 'Todo edited successfully', todo: todos[todoIndex] });
    }
    else {
        res.status(404).json({ message: 'Todo not found' });
    }
});
exports.default = router;