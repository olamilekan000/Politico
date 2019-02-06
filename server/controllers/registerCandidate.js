import { Pool } from 'pg'
import DbQuery from '../model';
import DbQueryOffice from '../model/dbQueryOffice'
import jwt from 'jsonwebtoken'

export default class RegisterCandidate {
	static async RegisterOffice(req, res){

		const { user_id } = req.params
		const user_idInt = parseInt(user_id, 10)

		try {
			// checks if the user trying to create the application is an admin
			const pool = new Pool();
			const queryId = DbQuery.getUserWithID(user_idInt)
			const dbRes = await pool.query(queryId);
			
			if(!dbRes.rows[0]){
				return res.status(404).json({
					"error": "User wasn't found, operation declined.",
				})
			}

			const tokenFromHeader = req.get('Authorization');
			const verified = jwt.verify(tokenFromHeader, 'secret');
			if(verified.isadmin === 'Admin'){
				return res.status(401).json({
					"error": "You are not authorized to perform this operation" 
				})
			}			

			// checks if the user about to be registered exists
			const { user, office } = req.body
			const queryIdforReg = DbQuery.getUserWithID(parseInt(user, 10))
			const dbResForReg = await pool.query(queryIdforReg);
			
			if(dbResForReg.rowCount === 0){
				return res.status(404).json({
					"error": "The User you're trying to register doesn't exist",
				})
			}

			//  checks if the user about to be registered hasn't been previously registeerd
			const queryIdforToCheckReg = DbQueryOffice.getUserWithUserID(parseInt(user, 10))
			const dbResForCheckedRegUser = await pool.query(queryIdforToCheckReg);
			
			if(dbResForCheckedRegUser.rows[0]){
				return res.status(409).json({
					"error": "The User you're trying to register has been previously registered.",
				})
			}

			const queryRegData = DbQueryOffice.registerUserForAnOffice(
				parseInt(office, 10),
				parseInt(user, 10),
				dbResForReg.rows[0].email
			);
			const registeredUser = await pool.query(queryRegData);			
			await pool.end();

			res.status(200).json({
				message: "User successfully registered"
			})

		} catch(e) {
			// statements
			throw e
		}
	}
}