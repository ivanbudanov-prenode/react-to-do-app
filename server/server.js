import cors from "cors";
import express from 'express';
import { getTasks, createTask, updateTask } from './methods.js';

const app = express();
app.use(express.json());
app.use(cors());


app.get('/tasks', async (req, res) => {
  const data = await getTasks();
  res.json({
    data
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




app.post('/tasks', async (req, res) => {
  const data = await createTask(req.body.name);
  res.json({
    id: data
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



app.put('/tasks', async (req, res) => {
  const data = await updateTask(req.body);
  res.json({
    data
  });


});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));