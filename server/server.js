import cors from "cors";
import express from 'express';

import {MongoClient, ServerApiVersion} from 'mongodb';

const app = express();

app.use(express.json());
app.use(cors());

let tasks = [{name: 'John', id: 1, isEditing: true, isChecked: false}, {name: 'Martha', id: 2, isEditing: true, isChecked: false}, {name: 'Luke', id: 3, isEditing: true, isChecked: false}];

async function runGetStarted() {
  const uri = "mongodb+srv://Ivan:password123password123@cluster0.8uzkrrx.mongodb.net/?appName=Cluster0";
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
runGetStarted().catch(console.dir);


/* endpoint for getting all tasks */
app.get('/tasks', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({
    tasks
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

/* endpoint for adding a task */
app.post('/tasks', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  console.log(req.body);
  tasks.push(req.body);

  res.json({
    tasks
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

/* endpoint for updating a task */
app.put('/tasks', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  console.log(req.body);
  let result = tasks.find(obj => obj.id === req.body.id);
  const taskIndex = tasks.findIndex(x => x.id === req.body.id);
  tasks[taskIndex] = req.body;

  res.json({
    tasks
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