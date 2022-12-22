import { Router } from 'express';

import { getMemberServiceStatus } from '../helpers/membersApiStatus';

const router = Router();

router.get('/', async (req, res) => {
  const memberServiceStatus = await getMemberServiceStatus(req);

  res.send({
    health: { memberServiceStatus },
  });
});

export default router;
