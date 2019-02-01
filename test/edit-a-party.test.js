import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';
import { properlyFilled, inCorrectlyFilled, badlyFilled } from './mock-data/mock-edit-party.test';

chai.use(chaiHttp);

const should = chai.should();
const { expect } = chai;

const BASE_URL = '/api/v1';

describe('Only an Admin can edit a party ', () => {
  describe('A party can be edited', () => {
    it('edits a political party if the user is Admin', (done) => {
      chai.request(app)
        .put(`${BASE_URL}/parties/1`)
        .set('content-type', 'application/json')
        .set('Authorization', 'admin')
        .send(properlyFilled)
        .end((err, res) => {
          res.status.should.be.eql(200);
          res.type.should.equal('application/json');
          res.body.message.should.be.eql('User Successfully Updated');
          res.body.data.id.should.be.eql(properlyFilled.id);
          done();
        });
    });
  });
  describe('Handling bad request from the Admin', () => {
    it('throws an error if the Admin enters a bad request', (done) => {
      chai.request(app)
        .put(`${BASE_URL}/parties/2`)
        .set('content-type', 'application/json')
        .set('Authorization', 'admin')
        .send(inCorrectlyFilled)
        .end((err, res) => {
          res.status.should.be.eql(400);
          res.type.should.equal('application/json');
          res.body.error.should.be.eql('Sorry, You need to enter details properly.');
          done();
        });
    });
  });
  describe('Handling bad request from the Admin and Users', () => {
    it('throws an error if the Admin trys to edit a user that does not exit', (done) => {
      chai.request(app)
        .put(`${BASE_URL}/parties/10`)
        .set('content-type', 'application/json')
        .set('Authorization', 'admin')
        .send(properlyFilled)
        .end((err, res) => {
          res.status.should.be.eql(404);
          res.type.should.equal('application/json');
          res.body.error.should.be.eql('The Political Party does not exist');
          done();
        });
    });
  });
  describe('Handling Un authorized Users', () => {
    it('throws an error an un authorized user trys to edit a user', (done) => {
      chai.request(app)
        .put(`${BASE_URL}/parties/1`)
        .set('content-type', 'application/json')
        .set('Authorization', '')
        .send(properlyFilled)
        .end((err, res) => {
          res.status.should.be.eql(401);
          res.type.should.equal('application/json');
          res.body.error.should.be.eql('You do not have the access to perform this action');
          done();
        });
    });
  });
});
