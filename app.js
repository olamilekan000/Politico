import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import debug from 'debug';
import dotenv from 'dotenv';
import router from './server/routers';
import './Passport';
import createTables from './server/database'

dotenv.config();

(async () => {
	await createTables()
})()

const consoleLog = debug('app');
const app = express();

const BASE_URL = '/api/v1/';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(BASE_URL, router);

const PORT = process.env.PORT || 8089;

app.get('/', (req, res) => {
	res.json({
		status: 200,
		"data": "Politico is live!"
	})
})

app.listen(PORT, () => {
  console.log(`Now listening for requests on port ${PORT}`);
});

export default app;
