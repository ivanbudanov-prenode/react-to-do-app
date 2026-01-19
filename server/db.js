import {MongoClient, ServerApiVersion, ObjectId} from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.8uzkrrx.mongodb.net/?appName=Cluster0`;
const client = new MongoClient(uri);
const database = client.db('test_db');
const myColl = database.collection("tasks");
const doc = [{name: 'John', isEditing: true, isChecked: false}, {name: 'Martha', isEditing: true, isChecked: false}, {name: 'Luke', isEditing: true, isChecked: false}];
const result = await myColl.insertMany(doc);

export { myColl };