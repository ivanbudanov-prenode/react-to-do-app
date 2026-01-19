

async function getTasksController(req, res) {
    const data = await getTasks();
    return res.json({data});
}