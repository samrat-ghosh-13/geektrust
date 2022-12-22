import express from 'express';
import path from 'path';
import axios from 'axios';
import morganBody from 'morgan-body';
import compression from 'compression';
import correlator from 'express-correlation-id';
import cors from 'cors';
import healthcheck from './app/controllers/healthcheck';
import liveness from "./app/controllers/liveness";

const app = express();

morganBody(app);

app
  .use(compression())
  .use(correlator())
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(express.static(path.join(__dirname, '../admin')))
  .use('/health/readiness', healthcheck)
  .use('/health/liveness', liveness);

// app.use(correlationIdHandler);
// app.use(errorHandler);

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

app.get('/api/members', async (req, res) => {
  const { data } = await axios({
    method: 'get',
    url: process.env.API_MEMBERS_URL,
  });

  const searchValue =
    req?.query?.search?.toString().toLowerCase().split(' ') || [];

  const searchableData = data.filter((obj: any) => {
    let found = false;
    searchValue.forEach((item) => {
      if (Object.values(obj).join(' ').toLowerCase().includes(item)) {
        found = true;
      }
    });
    return found;
  });

  res.status(200).send({
    message: 'Geektrust Members API',
    data: searchableData,
    totalRecords: searchableData.length,
  });
});

// serving fe client
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../admin/index.html'));
});

const port = process.env.API_PORT;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
