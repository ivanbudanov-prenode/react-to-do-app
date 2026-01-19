import { getTasks, createTask, updateTask } from './methods.js';

async function getTasksController(req, res) {
    const data = await getTasks();
    return res.json({data});
}

async function updateTasksController(req, res) {
    const data = await updateTask(req.body);
        res.json({
    data
    });
}

async function createTasksController(req, res) {
    const data = await createTask(req.body.name);
    res.json({
        id: data
    });
}

export { getTasksController, updateTasksController, createTasksController };