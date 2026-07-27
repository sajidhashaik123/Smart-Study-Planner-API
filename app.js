// Import Express
const express = require("express");

// Import File System
const fs = require("fs");

// Create an Express application
const app = express();

// Read JSON data
app.use(express.json());

// Set the port number
const PORT = 3000;

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to Smart Study Planner API");
});

// GET All Tasks
app.get("/tasks", (req, res) => {

    const data = fs.readFileSync("./data/tasks.json");

    const tasks = JSON.parse(data);

    res.json(tasks);

});

app.get("/tasks/:id", (req, res) => {

    const id = Number(req.params.id);

    const data = fs.readFileSync("./data/tasks.json");

    const tasks = JSON.parse(data);

    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task Not Found"
        });
    }

    res.json(task);

});

app.post("/tasks", (req, res) => {

    const data = fs.readFileSync("./data/tasks.json");

    const tasks = JSON.parse(data);

    // Validation
    if (!req.body.subject || !req.body.topic || !req.body.date || !req.body.priority) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const newTask = {

        id: tasks.length + 1,

        subject: req.body.subject,

        topic: req.body.topic,

        date: req.body.date,

        priority: req.body.priority,

        status: "Pending"

    };

    tasks.push(newTask);

    fs.writeFileSync("./data/tasks.json", JSON.stringify(tasks, null, 2));

    res.status(201).json(newTask);

});

app.put("/tasks/:id", (req, res) => {

    const id = Number(req.params.id);

    const data = fs.readFileSync("./data/tasks.json");

    const tasks = JSON.parse(data);

    const index = tasks.findIndex(task => task.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Task Not Found"
        });
    }

    tasks[index] = {
        ...tasks[index],
        subject: req.body.subject,
        topic: req.body.topic,
        date: req.body.date,
        priority: req.body.priority
    };

    fs.writeFileSync("./data/tasks.json", JSON.stringify(tasks, null, 2));

    res.json(tasks[index]);

});
app.delete("/tasks/:id", (req, res) => {

    const id = Number(req.params.id);

    const data = fs.readFileSync("./data/tasks.json");

    const tasks = JSON.parse(data);

    const index = tasks.findIndex(task => task.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Task Not Found"
        });
    }

    const deletedTask = tasks.splice(index, 1);

    fs.writeFileSync("./data/tasks.json", JSON.stringify(tasks, null, 2));

    res.json({
        message: "Task Deleted Successfully",
        deletedTask: deletedTask[0]
    });

});
app.patch("/tasks/:id/complete", (req, res) => {

    const id = Number(req.params.id);

    const data = fs.readFileSync("./data/tasks.json");

    const tasks = JSON.parse(data);

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task Not Found"
        });
    }

    task.status = "Completed";

    fs.writeFileSync("./data/tasks.json", JSON.stringify(tasks, null, 2));

    res.json({
        message: "Task Marked as Completed",
        task: task
    });

});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});