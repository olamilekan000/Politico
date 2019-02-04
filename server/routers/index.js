import { Router } from 'express';
import Controllers from '../controllers';

import { checkHeader, checkIfUserOrAdmin } from '../helpers/checkHeader';

const router = Router();

router.route('/create-party')
  .post(checkHeader, Controllers.createParty);

router.route('/get-parties')
  .get(checkIfUserOrAdmin, Controllers.getAllPoliticalParties);

export default router;
