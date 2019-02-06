import chai from 'chai';
import chaiHttp from 'chai-http';
import { Pool } from 'pg';
import createTables from '../server/database'

import app from '../app';
import TestDbQuery from './dbQuery';

chai.use(chaiHttp);

const should = chai.should();
const { expect } = chai;

const user = {
  firstname: 'Chigozie',
  lastname: 'Anidi',
  othername: 'Chigoze',
  email: 'chionline@gmail.com',
  phoneNumber: '08089562392',
  passportUrl: 'https://pbs.twimg.com/profile_images/852874627181367297/BhCGvY6d_200x200.jpg',
  isAdmin: true,
  password: 'secretlysecret',
};

const BASE_URL = '/api/v1/';

describe('/auth/signup User Registration', () => {

  before(async () => {
    await createTables()
  })

  describe('User Registration', () => {
    it('saves a user into the database', (done) => {
      chai.request(app)
        .post(`${BASE_URL}auth/signup`)
        .set('content-type', 'application/json')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          should.exist(res.body.Token);
          should.exist(res.body.user.firstname);
          should.exist(res.body.user.lastname);
          should.exist(res.body.user.id);
          should.exist(res.body.user.othername);
          should.exist(res.body.user.email);
          should.exist(res.body.user.phonenumber);
          should.exist(res.body.user.passporturl);
          should.exist(res.body.user.isadmin);
          done();
        });
    });

    describe('Already exitsing user', (done) => {
      it('Checks if a user exists before saving a user', (done) => {
        chai.request(app)
          .post(`${BASE_URL}auth/signup`)
          .set('content-type', 'application/json')
          .send(user)
          .end((err, res) => {
            res.should.have.status(409);
            res.body.error.should.be.eql('user with that email already exists');
            done();
          });
      });
    });
  });

  after(async () => {
    try {
      const pool = new Pool();
      await pool.query(TestDbQuery.deleteUserWithEmail(user.email));
      await pool.end();
    } catch (e) {
      throw e;
    }
  });
});
