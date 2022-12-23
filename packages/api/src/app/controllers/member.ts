import { Router } from 'express';
import axios from 'axios';
import { paginate } from '../helpers';

const router = Router();

router.get('/', async (req, res) => {
  const { data } = await axios({
    method: 'get',
    url: process.env.API_MEMBERS_URL,
  });

  // default page number is 1
  const pageNumber = Number(req?.query?.pageNumber) || 1;

  // default page size is 10
  const pageSize = Number(req?.query?.pageSize) || 10;

  // default search value is empty array
  // converting sentence into a string[] by splitting them based spaces
  const searchValue =
    req?.query?.search?.toString().toLowerCase().split(' ') || [];

  const searchableData = data
    .filter((obj: any) => {
      let found = false;
      searchValue.forEach((item) => {
        if (Object.values(obj).join(' ').toLowerCase().includes(item)) {
          found = true;
        }
      });
      return found;
    })
    .sort((a: any, b: any) => Number(a.id) - Number(b.id));

  const paginatedData = paginate(searchableData, pageSize, pageNumber);

  res.status(200).send({
    message: 'Geektrust Members API',
    data: paginatedData,
    currentPage: pageNumber,
    totalRecords: searchableData.length,
    totalPages: Math.ceil(searchableData.length / pageSize),
  });
});

export default router;
