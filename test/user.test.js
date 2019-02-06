import chai from 'chai';
import chaiHttp from 'chai-http';
import { Pool } from 'pg';
import createTables from '../server/database'

import app from '../app';
import TestDbQuery from './dbQuery';

chai.use(chaiHttp);

const should = chai.should();
const { expect } = chai;

const BASE_URL = '/api/v1/'

const signUser = {
  firstname: 'Chigozie',
  lastname: 'Anidi',
  othername: 'Chigoze',
  email: 'chionline@gmail.com',
  phoneNumber: '08089562392',
  passportUrl: 'https://pbs.twimg.com/profile_images/852874627181367297/BhCGvY6d_200x200.jpg',
  isAdmin: true,
  password: 'secretlysecret',
};

const user = {
    "email": "chionline@gmail.com",
    "password": "secretlysecret"
};

const user2 = {
    "email": "chiz98@gmail.com",
    "password": "secretlysecre t"
};

const user3 = {
    "email": "chionline@gmail.com",
    "password": "ola"
};

describe('/auth/signup User Registration', () => {

  before(async () => {
    await createTables()
  })

  describe('User Registration', () => {
    it('saves a user into the database', (done) => {
      chai.request(app)
        .post(`${BASE_URL}auth/signup`)
        .set('content-type', 'application/json')
        .send(signUser)
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
          .send(signUser)
          .end((err, res) => {
            res.should.have.status(409);
            res.body.error.should.be.eql('user with that email already exists');
            done();
          });
      });
    });
  });

  describe('/auth/login User Log in', () => {
    describe('a user logs in with the correct credentails', () => {
      it('Checks if a user has all credentails for loggin in', (done) => {
        chai.request(app)
          .post(`${BASE_URL}auth/login`)
          .set('content-type', 'application/json')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.status.should.be.eql('Successfully logged in')
            res.type.should.equal('application/json')
            expect(res.body.data).to.be.an('array');
            should.exist(res.body.data[0].user.firstname);
            should.exist(res.body.data[0].user.lastname);
            should.exist(res.body.data[0].user.id);
            should.exist(res.body.data[0].user.othername);
            should.exist(res.body.data[0].user.email);
            should.exist(res.body.data[0].user.phonenumber);
            should.exist(res.body.data[0].user.passporturl);
            should.exist(res.body.data[0].user.isadmin);
            done()
          })
      })

      it('fails because an individual logs in with a wrong password', (done) => {
        chai.request(app)
          .post(`${BASE_URL}auth/login`)
          .set('content-type', 'application/json')
          .send(user2)
          .end((err, res) => {
            res.should.have.status(401);
            done()
          })
      })

      it('fails because an individual logs in with a wrong password', (done) => {
        chai.request(app)
          .post(`${BASE_URL}auth/login`)
          .set('content-type', 'application/json')
          .send(user3)
          .end((err, res) => {
            res.should.have.status(401);
            done()
          })
      })          
    })
  })  

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
