import express from 'express';
import path from 'path';
import axios from 'axios';
import morganBody from 'morgan-body';
import compression from 'compression';
import correlator from 'express-correlation-id';
import cors from 'cors';

const app = express();

morganBody(app);

app
  .use(compression())
  .use(correlator())
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(express.static(path.join(__dirname, '../public')));

// app.use(correlationIdHandler);
// app.use(errorHandler);
// app.use("/health/readiness", healthcheck);
// app.use("/health/liveness", liveness);

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

app.get('/api/members', async (req, res) => {
  const { data } = await axios({
    method: 'get',
    url: 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json',
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
    count: searchableData.length,
  });
});

// serving fe client
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
