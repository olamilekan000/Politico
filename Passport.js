import passport from 'passport'
import passportJWT from 'passport-jwt'
import { Pool } from 'pg';

import DbQuery from './server/model/';
import { comparePwd } from './server/helpers/pwdHash';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

passport.use(new JWTStrategy({
	jwtFromRequest: ExtractJWT.fromHeader('authorization'),
	secretOrKey: 'secret'	
}, async (payload, done) => {
	try{
		const pool = new Pool();
		const user = await DbQuery.getUserWithEmail(payload.email)
		let dbRes = await pool.query(user);
		await pool.end();
		console.log(dbRes.rows[0])
		if(dbRes.rows[0]){
			return done(null, dbRes.rows[0]);
		}else{
			return done(null, false);
		}	

	}catch(err){
		return done(err)
	}
}))

passport.use(new LocalStrategy({
	usernameField: 'email'
}, async (email, password, done) => {
	try{
		const pool = new Pool();
		let signedUser = DbQuery.getUserWithEmail(email)
		let dbRes = await pool.query(signedUser);
		await pool.end();
		if (!dbRes.rows[0]) {
			return done(null, false, { message: 'Incorrect email.' });
		}

		// gets the logged in user hashed password
		const hashedPwd = dbRes.rows[0]['password']
		// compare password with the user passport
		const realUser = await comparePwd(password, hashedPwd);
		if(!realUser){
			return done(null, false, { message: 'Incorrect password.' });

		}		

		return done(null, dbRes.rows[0]);
	}catch(error){
		return done(error);
	}
}))