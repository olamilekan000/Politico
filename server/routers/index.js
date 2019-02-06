import { Router } from 'express';
import passport from 'passport';
import Parties from '../controllers';
import Offices from '../controllers/offices';
import signUpUser from '../controllers/signup';
import signInUser from '../controllers/signin';
import RegisterCandidate from '../controllers/registerCandidate'

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

router.route('/auth/signup')
  .post(signUpUser.register);

router.route('/auth/login')
  .post(passport.authenticate('local', { session: false }), signInUser.signin);

router.route('/office/:user_id/register')
  .post(passport.authenticate('jwt', { session: false }), RegisterCandidate.RegisterOffice);  

export default router;
