import chai from 'chai';
import chaiHttp from 'chai-http';
import createTables from '../server/database'

import app from '../app';

chai.use(chaiHttp);

const { expect } = chai;
const should = chai.should();

const BASE_URL = '/api/v1';

describe('Delete a party', () => {
  before(async () => {
    await createTables()
  })
  it('checks if an Admin can delete a party', (done) => {
    chai.request(app)
      .delete(`${BASE_URL}/parties/1`)
      .set('content-type', 'applicaction/json')
      .set('Authorization', 'admin')
      .end((err, res) => {
        res.should.have.status(200);
        res.type.should.equal('application/json');
        expect(res.body.data).to.be.an('array');
        res.body.message.should.be.eql('Successfully Deleted a party');
        done();
      });
  });
  it('checks if an Admin can delete a party', (done) => {
    chai.request(app)
      .delete(`${BASE_URL}/parties/1`)
      .set('content-type', 'applicaction/json')
      .set('Authorization', '')
      .end((err, res) => {
        res.should.have.status(401);
        res.type.should.equal('application/json');
        res.body.error.should.be.eql('You do not have the access to perform this action');
        done();
      });
  });
});
