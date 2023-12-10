const express = require("express");
const app = express();

const tasks = [
    {
        id: 1,
        "task name": "Gym",
        description: "Daily workout",
        status: "Complete",
    },
    {
        id: 2,
        "task name": "Coding",
        description: "Problem Solving",
        status: "Complete",
    },
    {
        id: 3,
        "task name": "Eating",
        description: "Hygienic Foods",
        status: "Complete",
    },
    {
        id: 4,
        "task name": "Sleeping",
        description: "Daily 8 hrs",
        status: "Incomplete",
    },
];

app.use(express.json());

app.get("/", (req, res) => {

    res.send("Task is working");

});

app.get("/tasks", (req, res) => {

    res.json(tasks);

});

app.get("/tasks/:id", (req, res) => {

    const taskId = parseInt(req.params.id);
    const task = tasks.find(task => task.id === taskId);

    if (task) {
        res.json(task);
    } else {
        res.json({ message: "Task not found" });
    }

});

app.post("/addtask", (req, res) => {

    const newTask = req.body;
    newTask.id = tasks.length + 1;
    tasks.push(newTask);

    res.json(newTask);

});

app.put('/update/:id', (req, res) => {

    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
  
    if (taskIndex !== -1) {
     tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
      return res.json(tasks[taskIndex]);
    } else {
      res.json({ message: 'Task not found' });
    }
});

app.delete("/delete/:id",(req, res) => {

    const Id =req.params.id;
    const result = tasks.filter((item)=>item.id !== Id);
    res.json({message:"Task deleted"});

});

app.listen(4000, () => {
    console.log("Server is up and running");
});