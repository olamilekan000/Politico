import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';
import createTables from '../server/database'

chai.use(chaiHttp);

const should = chai.should();
const { expect } = chai;

const BASE_URL = '/api/v1';

describe('Only an Admin and user can get an office ', () => {
  before(async () => {
    await createTables()
  })
  describe('Get an office', () => {
    it('gets a political office if the user is Admin', (done) => {
      chai.request(app)
        .get(`${BASE_URL}/Offices/1`)
        .set('content-type', 'application/json')
        .set('Authorization', 'admin')
        .end((err, res) => {
          res.status.should.be.eql(200);
          res.type.should.equal('application/json');
          done();
        });
    });
  });
  describe('should get all parties with auth header is user ', () => {
    it('gets an office for an authorized user', (done) => {
      chai.request(app)
        .get(`${BASE_URL}/Offices/2`)
        .set('content-type', 'application/json')
        .set('Authorization', 'user')
        .end((err, res) => {
          res.should.have.status(200);
          res.type.should.equal('application/json');
          done();
        });
    });
  });
  describe('Handling bad request from the Admin and Users', () => {
    it('throws an error if the Admin trys to get an office that does not exit', (done) => {
      chai.request(app)
        .get(`${BASE_URL}/Offices/10`)
        .set('content-type', 'application/json')
        .set('Authorization', 'admin')
        .end((err, res) => {
          res.status.should.be.eql(404);
          res.type.should.equal('application/json');
          done();
        });
    });
  });
  describe('Handling Un authorized Users', () => {
    it('throws an error an un authorized user trys to get an office', (done) => {
      chai.request(app)
        .get(`${BASE_URL}/Offices/1`)
        .set('content-type', 'application/json')
        .end((err, res) => {
          res.status.should.be.eql(401);
          res.type.should.equal('application/json');
          done();
        });
    });
  });
  describe('Handling bad request from the Admin and Users', () => {
    it('throws an error if the Admin trys to get an office wrongly', (done) => {
      chai.request(app)
        .get(`${BASE_URL}/Offices/0`)
        .set('content-type', 'application/json')
        .set('Authorization', 'admin')
        .end((err, res) => {
          res.status.should.be.eql(404);
          res.type.should.equal('application/json');
          done();
        });
    });
  });
});
