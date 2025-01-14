import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import appConfig from './app.config.js';
import internalRoute from './internal/internal.routes.js';
import externalRoute from './external/external.routes.js';

dotenv.config({
  path: '../.env'
});

const app = express();

app.use(cors());

app.use(express.json());

app.use('/internal', internalRoute);

app.use('/external', externalRoute)

app.get('/', () => {
  console.info(`Backend run on port ${appConfig.appPort}`)
});


app.listen(appConfig.appPort, () => {
  console.info(`Backend run on port ${appConfig.appPort}`)
});