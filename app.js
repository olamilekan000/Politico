import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import debug from 'debug';
import dotenv from 'dotenv';

dotenv.config();

const consoleLog = debug('app');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Basic set up is live!');
});

const PORT = process.env.PORT || 8089;

app.listen(PORT, () => {
  consoleLog(`Now listening for requests on port ${PORT}`);
});

export default app;
