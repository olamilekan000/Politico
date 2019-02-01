import { Router } from 'express';
import Controllers from '../controllers';

import { checkHeader, checkIfUserOrAdmin } from '../helpers/checkHeader';

const router = Router();

router.route('/create-party')
  .post(checkHeader, Controllers.createParty);

router.route('/get-parties')
  .get(checkIfUserOrAdmin, Controllers.getAllPoliticalParties);

router.route('/get-party/:id')
  .put(checkHeader, Controllers.editAParty);

router.route('/delete/:id')
  .delete(checkHeader, Controllers.deleteAParty);

router.route('/create-office')
  .post(checkHeader, Controllers.createOffice);

router.route('/all-offices')
  .get(checkIfUserOrAdmin, Controllers.allOffices);

router.route('/an-office/:id')
  .get(checkIfUserOrAdmin, Controllers.anOffice);

export default router;
