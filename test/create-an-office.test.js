import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

import { rightOffice, notTooRight, notRight } from './mock-data/create-office.test';

chai.use(chaiHttp);

const should = chai.should();
const { expect } = chai;

const BASE_URL = '/api/v1';

describe('/create-office POST', () => {
  describe('Admin can create an office', () => {
    it('Creates an Office', (done) => {
      chai.request(app)
        .post(`${BASE_URL}/create-office`)
        .set('content-type', 'application/json')
        .set('Authorization', 'admin')
        .send(rightOffice)
        .end((err, res) => {
          res.should.have.status(200);
          res.type.should.equal('application/json');
          should.exist(res.body.data);
          expect(res.body.data).to.be.an('array');
          res.body.message.should.be.eql('Political Office Successfully created');
          done();
        });
    });
  });

  describe('Admin trys to create an office with bad data entry', () => {
    it('Fails to create an office', (done) => {
      chai.request(app)
        .post(`${BASE_URL}/create-office`)
        .set('content-type', 'application/json')
        .set('Authorization', 'admin')
        .send(notTooRight)
        .end((err, res) => {
          			res.should.have.status(400);
          			should.exist(res.body.error);
          			res.type.should.equal('application/json');
          			res.body.error.should.be.eql('Sorry, You need to enter details properly.');
          done();
        });
    });
  });

  describe('Admin trys to create an office with a missing field', () => {
    it('Fails to create an office because of a missing field', (done) => {
      chai.request(app)
        .post(`${BASE_URL}/create-office`)
        .set('content-type', 'application/json')
        .set('Authorization', 'admin')
        .send(notRight)
        .end((err, res) => {
          			res.should.have.status(500);
          			should.exist(res.body.error);
          			res.type.should.equal('application/json');
          			res.body.error.should.be.eql('Sorry, Something is not right.');
          done();
        });
    });
  });

  describe('Admin with a wron token or no token trys to create an office', () => {
    it('Fails to create an office because of a wrong token', (done) => {
      chai.request(app)
        .post(`${BASE_URL}/create-office`)
        .set('content-type', 'application/json')
        .set('Authorization', '')
        .send(rightOffice)
        .end((err, res) => {
          			res.should.have.status(401);
          			should.exist(res.body.error);
          			res.type.should.equal('application/json');
          			res.body.error.should.be.eql('You do not have the access to perform this action');
          done();
        });
    });
  });
});
