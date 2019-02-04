import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

import { correctParty, inCorrectParty1, inCorrectParty2 } from './mock-data/mock.party';

chai.use(chaiHttp);

const should = chai.should();
const { expect } = chai;

const AUTH = 'admin';
const BASE_URL = '/api/v1';

describe('/create_party ', () => {
  describe('create a political party', () => {
    it('creates a political party giving the correct data', (done) => {
      chai.request(app)
        .post(`${BASE_URL}/create-party`)
        .set('content-type', 'application/json')
        .set('Authorization', AUTH)
        .send(correctParty)
        .end((err, res) => {
          res.should.have.status(200);
          res.type.should.equal('application/json');
          should.exist(res.body.message);
          res.body.message.should.be.eql('Political Party Successfully created');
          done();
        });
    });
  });
  describe('trys to create a political party', () => {
    it('fails to create a political party', (done) => {
      chai.request(app)
        .post(`${BASE_URL}/create-party`)
        .set('content-type', 'application/json')
        .set('Authorization', AUTH)
        .send(inCorrectParty1)
        .end((err, res) => {
          res.should.have.status(400);
          should.exist(res.body.error);
          res.type.should.equal('application/json');
          res.body.error.should.be.eql('Sorry, You need to enter details properly.');
          done();
        });
    });
  });
  describe('trys to create a political party', () => {
    it('fails to create a political due to empty strings and incomplete data', (done) => {
      chai.request(app)
        .post(`${BASE_URL}/create-party`)
        .set('content-type', 'application/json')
        .set('Authorization', AUTH)
        .send(inCorrectParty2)
        .end((err, res) => {
          res.should.have.status(400);
          should.exist(res.body.error);
          res.type.should.equal('application/json');
          res.body.error.should.be.eql('Sorry, You need to enter details properly.');
          done();
        });
    });
  });
  describe('trys to create a political party', () => {
    it('fails to because there is no auth token', (done) => {
      chai.request(app)
        .post(`${BASE_URL}/create-party`)
        .set('content-type', 'application/json')
        .set('Authorization', '')
        .send(correctParty)
        .end((err, res) => {
          res.should.have.status(401);
          should.exist(res.body.error);
          res.type.should.equal('application/json');
          res.body.error.should.be.eql('You don not have the access to create a party');
          done();
        });
    });
  });
  describe('trys to create a political party', () => {
    it('fails to create because a wrong token was used', (done) => {
      chai.request(app)
        .post(`${BASE_URL}/create-party`)
        .set('content-type', 'application/json')
        .set('Authorization', 'user')
        .send(correctParty)
        .end((err, res) => {
          res.should.have.status(401);
          should.exist(res.body.error);
          res.type.should.equal('application/json');
          res.body.error.should.be.eql('You don not have the access to create a party');
          done();
        });
    });
  });
});
