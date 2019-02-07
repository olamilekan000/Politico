import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import createTables from '../server/database'

chai.use(chaiHttp);

const should = chai.should();
const { expect } = chai;

const BASE_URL = '/api/v1';

describe('/get-offices GET all offices', () => {
  before(async () => {
    await createTables()
  })
  describe('should get all offices with auth header user ', () => {
    it('gets all offices for an authorized user', (done) => {
      chai.request(app)
        .get(`${BASE_URL}/Offices`)
        .set('content-type', 'application/json')
        .set('Authorization', 'user')
        .end((err, res) => {
          res.should.have.status(200);
          res.type.should.equal('application/json');
          expect(res.body.data).to.be.an('array');
          done();
        });
    });
  });
  describe('should get all offices with auth header admin ', () => {
    it('gets all offices for an authorized user', (done) => {
      chai.request(app)
        .get(`${BASE_URL}/Offices`)
        .set('content-type', 'application/json')
        .set('Authorization', 'admin')
        .end((err, res) => {
          res.should.have.status(200);
          res.type.should.equal('application/json');
          expect(res.body.data).to.be.an('array');
          done();
        });
    });
  });
  describe('should not get all offices with if an auth header other than admin or user', () => {
    it('doesn\'t get the offices if auth header is not an admin or a user', (done) => {
      chai.request(app)
        .get(`${BASE_URL}/Offices`)
        .set('content-type', 'application/json')
        .set('Authorization', 'someoneelse')
        .end((err, res) => {
          res.should.have.status(401);
          res.type.should.equal('application/json');
          res.body.error.should.be.eql('You do not have the access to this resource.');
          done();
        });
    });
  });
  describe('should not get all offices with if no auth header is provided', () => {
    it('doesn\'t get the offices if auth header is undefined', (done) => {
      chai.request(app)
        .get(`${BASE_URL}/Offices`)
        .set('content-type', 'application/json')
        .end((err, res) => {
          res.should.have.status(401);
          res.type.should.equal('application/json');
          res.body.error.should.be.eql('You do not have the access to this resource.');
          done();
        });
    });
  });
});
