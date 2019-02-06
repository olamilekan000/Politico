import chai from 'chai';
import chaiHttp from 'chai-http';
import { Pool } from 'pg';
import createTables from '../server/database'
import deleteDatabase  from '../server/model/dropDb'

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

const userReg =   {
  office: 1,
  user: 69
}

let token = ''
let userID = ''

const myPetition = {
  createdBy : userID,
  office : 1001 ,
  body : "I want to craeate a petition... " ,
  evidence: " I have all evidencies"

}

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
          userID = res.body.user.id
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
            done();
            token = res.body.data[0].Token
          })
      })

      it('fails because an individual logs in with a wrong password', (done) => {
        chai.request(app)
          .post(`${BASE_URL}auth/login`)
          .set('content-type', 'application/json')
          .send(user2)
          .end((err, res) => {
            res.should.have.status(401);
            done();
          })
      })

      it('fails because an individual logs in with a wrong password', (done) => {
        chai.request(app)
          .post(`${BASE_URL}auth/login`)
          .set('content-type', 'application/json')
          .send(user3)
          .end((err, res) => {
            res.should.have.status(401);
            done();
          })
      })          
    })
  }) 

  describe('/REGISTER Only an Admin can register a candidate', () => {
    it('checks if the admin can register a user for an office', (done) => {
      chai.request(app)
        .post(`${BASE_URL}office/${userID}/register`)
        .send(userReg)
        .set('content-type', 'application/json')
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(401);
          res.type.should.equal('application/json')
          done();
        })
    })
  })

  describe('/PETITIONS A user can raise a pettion', () => {
    it('User can make a petition', (done) => {
      chai.request(app)
        .post(`${BASE_URL}petitions`)
        .send(myPetition)
        .set('content-type', 'application/json')
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.type.should.equal('application/json')
          should.exist(res.body.data.id);
          should.exist(res.body.data.createdon);
          should.exist(res.body.data.createdby);
          should.exist(res.body.data.office);
          should.exist(res.body.data.body);
          should.exist(res.body.data.evidence);
        })
      done();
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
