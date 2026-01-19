import dotenv from 'dotenv';
dotenv.config();
import cors from "cors";
import express from 'express';
import {MongoClient, ServerApiVersion, ObjectId} from 'mongodb';

const app = express();
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.8uzkrrx.mongodb.net/?appName=Cluster0`;
const client = new MongoClient(uri);
const database = client.db('test_db');
const myColl = database.collection("tasks");
const doc = [{name: 'John', isEditing: true, isChecked: false}, {name: 'Martha', isEditing: true, isChecked: false}, {name: 'Luke', isEditing: true, isChecked: false}];
const result = await myColl.insertMany(doc);

async function getTasks() {
  const result = await database.collection("tasks").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    return result;
  });
  const cleanResult = result.map(({ _id, name, isEditing, isChecked }) => ({ id: _id, name, isEditing, isChecked }));
  return cleanResult;
}

app.get('/tasks', async (req, res) => {
  const data = await getTasks();
  res.json({
    data
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


async function createTask(newName) {
  const newTask = {name: newName, isEditing: true, isChecked: false};
  const result = await myColl.insertOne(newTask);
  return result.insertedId;
}

app.post('/tasks', async (req, res) => {
  const data = await createTask(req.body.name);
  res.json({
    id: data
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

async function updateTask(updatedTask) {
  const newObjectId = new ObjectId(updatedTask.id);
  const filter = { _id: newObjectId };
  const updateTask = {
   $set: {
      name: updatedTask.name,
      isEditing: updatedTask.isEditing,
      isChecked: updatedTask.isChecked,
   },
  };
  const result = await myColl.updateOne(filter, updateTask);
  const cleanResult = {id: result._id, name: result.name, isEditing: result.isEditing, isChecked: result.isChecked};
  return cleanResult;

}

app.put('/tasks', async (req, res) => {
  const data = await updateTask(req.body);
  res.json({
    data
  });


});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));