import { Router } from 'express';
import Parties from '../controllers';
import Offices from '../controllers/offices';

import { checkHeader, checkIfUserOrAdmin } from '../helpers/checkHeader';

const router = Router();

router.route('/parties')
  .post(checkHeader, Parties.createParty);

router.route('/parties')
  .get(checkIfUserOrAdmin, Parties.getAllPoliticalParties);

router.route('/parties/:id')
  .put(checkHeader, Parties.editAParty);

router.route('/parties/:id')
  .delete(checkHeader, Parties.deleteAParty);

router.route('/Offices')
  .post(checkHeader, Offices.createOffice);

router.route('/Offices')
  .get(checkIfUserOrAdmin, Offices.allOffices);

router.route('/Offices/:id')
  .get(checkIfUserOrAdmin, Offices.anOffice);

export default router;
