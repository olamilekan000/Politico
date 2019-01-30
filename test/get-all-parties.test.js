import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

const should = chai.should();
const { expect } = chai;

const BASE_URL = '/api/v1';

describe('/get-parties GET all parties', () => {
  describe('should get all parties with auth header user ', () => {
    it('gets all parties for an authorized user', (done) => {
      chai.request(app)
        .get(`${BASE_URL}/get-parties`)
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
  describe('should get all parties with auth header admin ', () => {
    it('gets all parties for an authorized user', (done) => {
      chai.request(app)
        .get(`${BASE_URL}/get-parties`)
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
  describe('should not get all parties with if an auth header other than admin or user', () => {
    it('doesn\'t get the parties if auth header is not an admin or a user', (done) => {
      chai.request(app)
        .get(`${BASE_URL}/get-parties`)
        .set('content-type', 'application/json')
        .set('Authorization', 'someoneelse')
        .end((err, res) => {
          res.should.have.status(401);
          res.type.should.equal('application/json');
          res.body.error.should.be.eql('You don not have the access to view all parties.');
          done();
        });
    });
  });
  describe('should not get all parties with if no auth header is provided', () => {
    it('doesn\'t get the parties if auth header is undefined', (done) => {
      chai.request(app)
        .get(`${BASE_URL}/get-parties`)
        .set('content-type', 'application/json')
        .end((err, res) => {
          res.should.have.status(401);
          res.type.should.equal('application/json');
          res.body.error.should.be.eql('You don not have the access to view all parties.');
          done();
        });
    });
  });
});
