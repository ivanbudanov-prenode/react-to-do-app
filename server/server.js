import dotenv from 'dotenv';
dotenv.config();

import cors from "cors";
import express from 'express';

import {MongoClient, ServerApiVersion, ObjectId} from 'mongodb';

const app = express();


app.use(express.json());
app.use(cors());
/*app.use(cors({
    origin: 'http://localhost:5173',
}))*/
/*app.use(cors({
    origin: true,
}))*/
/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/
/*var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.configure(function() {
    app.use(allowCrossDomain);
    //some other code
});  */  

/*console.log(process.env);*/


let tasks = [{name: 'John', id: 1, isEditing: true, isChecked: false}, {name: 'Martha', id: 2, isEditing: true, isChecked: false}, {name: 'Luke', id: 3, isEditing: true, isChecked: false}];

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.8uzkrrx.mongodb.net/?appName=Cluster0`;
  const client = new MongoClient(uri);
const database = client.db('test_db');
    const myColl = database.collection("tasks");
    const doc = [{name: 'John', id: 1, isEditing: true, isChecked: false}, {name: 'Martha', id: 2, isEditing: true, isChecked: false}, {name: 'Luke', id: 3, isEditing: true, isChecked: false}];
    const result = await myColl.insertMany(doc);
    console.log(
      `A document was inserted with the _id: ${result.insertedId}`,
    );

async function runGetStarted() {
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.8uzkrrx.mongodb.net/?appName=Cluster0`;
  const client = new MongoClient(uri);
  /*try {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);
    console.log(movie);
  } finally {
    await client.close();
  }*/
  try {
    const database = client.db('test_db');
    const myColl = database.collection("tasks");
    const doc = [{name: 'John', id: 1, isEditing: true, isChecked: false}, {name: 'Martha', id: 2, isEditing: true, isChecked: false}, {name: 'Luke', id: 3, isEditing: true, isChecked: false}];
    const result = await myColl.insertMany(doc);
    console.log(
      `A document was inserted with the _id: ${result.insertedId}`,
    );
  } finally {
    await client.close();
  }
}
/*runGetStarted().catch(console.dir);*/

async function getTasks() {
  const result = await database.collection("tasks").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    return result;
  });
  return result;
}

/* endpoint for getting all tasks */
app.get('/tasks', async (req, res) => {
  /*res.setHeader('Access-Control-Allow-Origin', '*');*/
  /*res.json({
    tasks
  });*/
  const data = await getTasks();
  console.log(data);
  res.json({
    data
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


async function createTask(newName) {
  const newTask = {name: newName, id: 4, isEditing: true, isChecked: false};
  const result = await myColl.insertOne(newTask);

  return result.insertedId;
}

/* endpoint for adding a task */
app.post('/tasks', async (req, res) => {
  /*res.setHeader('Access-Control-Allow-Origin', '*');*/
  console.log(req.body);
  const data = await createTask(req.body.name);
  console.log(data);
  res.json({
    data
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

async function updateTask(updatedTask) {
  console.log("updated task _id: " + updatedTask._id);
  const newObjectId = new ObjectId(updatedTask.id);
  const filter = { _id: newObjectId };
  // update the value of the 'quantity' field to 5
  const updateTask = {
   $set: {
      name: updatedTask.name,
      isEditing: updatedTask.isEditing,
      isChecked: updatedTask.isChecked,
   },
  };
  const result = await myColl.updateOne(filter, updateTask);
  return result;

  /*return result.insertedId;*/
}

/* endpoint for updating a task */
app.put('/tasks', async (req, res) => {
  console.log(req.body);
  const data = await updateTask(req.body);
  console.log(data);
  res.json({
    data
  });


});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


/*const { createServer } = require('node:http');
const hostname = '127.0.0.1';
const port = 3000;
const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});*/