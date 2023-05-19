const express = require('express');
import mongoose, { ConnectOptions } from 'mongoose';
import todosRouter from './routers/todosRouter';
import cors from 'cors';

const DATA_BASE_URL = 'mongodb://0.0.0.0:27017/todosdb';
const PORT = 8080;

const app = express();
app.use(cors({
  origin: '*',
}));
app.use(express.json());
app.use(todosRouter);

mongoose
  .connect(DATA_BASE_URL, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log(`DB connection error: ${error}`));

app.listen(PORT, '0.0.0.0', (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`listening port ${PORT}`);
  }
});