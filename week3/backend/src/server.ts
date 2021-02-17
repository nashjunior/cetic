import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import path from 'path';
import 'express-async-errors';
import errorHandler from './errors/handleError';
import { createConnection, getConnectionManager } from 'typeorm';

createConnection();

console.log(getConnectionManager().connections);
const app = express();
app.use(cors());
app.use(express.json());

app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(errorHandler);

app.listen(3333, () => console.log('Server iniciou na porta 3333'));
