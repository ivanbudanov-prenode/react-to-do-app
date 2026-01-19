import cors from "cors";
import express from 'express';
import router from './routes.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));