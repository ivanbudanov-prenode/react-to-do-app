import { getTasksController, updateTasksController, createTasksController } from "./controller.js";
import express from 'express';
const router = express.Router();

router.get('/tasks', getTasksController);
router.put('/tasks', updateTasksController);
router.post('/tasks', createTasksController);

export default router;