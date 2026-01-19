import { myColl } from './db.js';
import {ObjectId} from 'mongodb';

async function getTasks() {
  const result = await myColl.find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    return result;
  });
  const cleanResult = result.map(({ _id, name, isEditing, isChecked }) => ({ id: _id, name, isEditing, isChecked }));
  return cleanResult;
}

async function createTask(newName) {
  const newTask = {name: newName, isEditing: true, isChecked: false};
  const result = await myColl.insertOne(newTask);
  return result.insertedId;
}

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
export { getTasks, createTask, updateTask };