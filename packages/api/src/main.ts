import express from 'express';
import path from 'path';
import morganBody from 'morgan-body';
import compression from 'compression';
import correlator from 'express-correlation-id';
import cors from 'cors';

// controllers
import healthcheck from './app/controllers/healthcheck';
import liveness from './app/controllers/liveness';
import api from './app/controllers/api';
import members from './app/controllers/member';

// middleware
import { correlationIdHandler, errorHandler } from './app/middleware';

const app = express();

morganBody(app);

app
  .use(compression())
  .use(correlator())
  .use(correlationIdHandler)
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(errorHandler)
  .use(express.static(path.join(__dirname, '../admin')))
  .use('/health/readiness', healthcheck)
  .use('/health/liveness', liveness)
  .use('/api', api)
  .use('/api/members', members);

// serving fe client
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../admin/index.html'));
});

const port = process.env.API_PORT;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
