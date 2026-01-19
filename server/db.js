import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.8uzkrrx.mongodb.net/?appName=Cluster0`;
const client = new MongoClient(uri);
const database = client.db('test_db');
const myColl = database.collection("tasks");

export { myColl };