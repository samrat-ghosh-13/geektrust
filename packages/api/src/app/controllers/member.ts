import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.get('/', async (req, res) => {
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

export default router;
