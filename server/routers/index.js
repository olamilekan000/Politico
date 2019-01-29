import { Router } from 'express';
import Controllers from '../controllers';

import checkHeader from '../helpers/checkHeader';

const router = Router();

router.route('/create-party')
  .post(checkHeader, Controllers.createParty);

export default router;
