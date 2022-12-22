import { Router } from 'express';

import { writeLog } from '../loggers';

const router = Router();

router.get('/', async (req, res) => {
  writeLog({
    level: 'info',
    referer: req.header('Referer'),
    method: req.method,
    url: req.originalUrl,
    message: 'Healthy!',
    requestBody: req.body,
  });
  res.status(200);
  res.send('Healthy!');
});

export default router;
