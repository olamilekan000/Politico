import chai from 'chai';
import chaiHttp from 'chai-http';
import { Pool } from 'pg';

import app from '../app';

chai.use(chaiHttp);

const should = chai.should();
const { expect } = chai;

const BASE_URL = '/api/v1';

let token = ''

const userLoginDetails = {
	email: 'chiz98@gmail.com',
	password: 'ola'
}

const regUser =   {
    office: 1,
    user : 69
 }

describe('/REGISTER Only an Admin can register a candidate', () => {

	before(async () => {
		const response = await chai.request(app).post(`${BASE_URL}/auth/login`).send(userLoginDetails)
		token = response.body.data[0].Token	
	})

	it('checks if the admin can register a user for an office', (done) => {
		chai.request(app)
			.post(`${BASE_URL}/office/55/register`)
			.send(regUser)
			.set('content-type', 'application/json')
			.set('Authorization', token)
			.end((err, res) => {
				res.should.have.status(200);
				done();
			})
	})

	after(async () => {
      const pool = new Pool();
      await pool.query({
      	text: `DELETE FROM office WHERE name=$1`,
      	values: [regUser.user]
      });
      await pool.end();
	})	
})

