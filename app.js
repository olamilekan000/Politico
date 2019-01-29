import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import debug from 'debug';
import dotenv from 'dotenv';
import router from './server/routers';

dotenv.config();

const consoleLog = debug('app');
const app = express();

const BASE_URL = '/api/v1/';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(BASE_URL, router);

const PORT = process.env.PORT || 8089;

app.listen(PORT, () => {
  consoleLog(`Now listening for requests on port ${PORT}`);
  console.log(`Now listening for requests on port ${PORT}`);
});

export default app;
