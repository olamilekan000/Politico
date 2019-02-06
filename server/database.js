import { Pool } from 'pg'

const createTables = async () => {
	try {
			// statements
		const pool = new Pool();

		await pool.query({
			text:`CREATE TABLE IF NOT EXISTS users(
				id SERIAL,
				firstname VARCHAR NOT NULL,
				lastname VARCHAR NOT NULL,
				othername VARCHAR NOT NULL,
				email VARCHAR(50) NOT NULL PRIMARY KEY,
				phonenumber VARCHAR(50) NOT NULL,
				passporturl text NOT NULL,
				isadmin BOOLEAN NOT NULL,
				password TEXT NOT NULL
			)`,
		})

		await pool.query({
			text:`CREATE TABLE IF NOT EXISTS office(
				office VARCHAR NOT NULL,
				name VARCHAR(200) NOT NULL,
				email VARCHAR(250) NOT NULL REFERENCES users(email)
			)`
		})

		await pool.query({
			text:`INSERT INTO users(
				firstname,
				lastname,
				othername,
				email,
				phonenumber,
				passporturl,
				isadmin,
				password
			)VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,
			values:[
				'Tola',
				'Anidi',
				'Chigoze',
				'chiz985@gmail.com',
				'08089562392',
				' https://pbs.twimg.com/profile_images/852874627181367297/BhCGvY6d_200x200.jpg',
				true,
				'2b$10$evI4zw9a9jEdi1asKQEV3eyP7DlZCyuvw7UXMDZPJVWgMDAoiS.S.'
			]
		})

		await pool.query({
			text: `DELETE FROM users WHERE email=$1`,
			values:['chiz985@gmail.com']
		})				

		await pool.end();		
	} catch(e) {
		// statements
		console.log(e);
	}
}

export default createTables
