import chai from 'chai';
import chaiHttp from 'chai-http';
import { Pool } from 'pg';
import createTables from '../server/database'

import app from '../app';
import TestDbQuery from './dbQuery';

chai.use(chaiHttp);

const should = chai.should();
const { expect } = chai;

const user = {
    "email": "chiz98@gmail.com",
    "password": "ola"
};

const user2 = {
    "email": "chiz98@gmail.com",
    "password": "ol a"
};

const user3 = {
    "email": "chiz100@gmail.com",
    "password": "ola"
};

const BASE_URL = '/api/v1/';

describe('/auth/login User Log in', () => {
	before(async () => {
		await createTables()
	})	
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