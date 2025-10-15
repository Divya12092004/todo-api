const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Temporary data storage (like memory)
let todos = [];

// 1. Get all todos
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

// 2. Add a new todo
app.post("/api/todos", (req, res) => {
  const newTodo = {
    id: Date.now(),          // unique id
    text: req.body.text,     // what the user entered
    completed: false         // initially not done
  };
  todos.push(newTodo);
  res.json(newTodo);
});

// 3. Toggle completion status
app.put("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  res.json(todos.find(todo => todo.id === id));
});

// 4. Delete all completed todos
app.delete("/api/todos/completed", (req, res) => {
  todos = todos.filter(todo => !todo.completed);
  res.json({ message: "Deleted completed todos" });
});

// Start the server
const PORT = process.env.PORT || 5000; // Use Render's PORT or default 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

