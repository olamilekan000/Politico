import { Pool } from 'pg'

const createTbles = async () => {
	const pool = new Pool();

	await pool.query({
		text:`CREATE TABLE IF NOT EXISTS users(
			id NOT NULL SERIAL,
			firstname VARCHAR NOT NULL,
			lastname VARCHAR NOT NULL,
			othername VARCHAR NOT NULL,
			email VARCHAR(50) NOT NULL PRIMARY KEY,
			phonenumber VARCHAR(50) NOT NULL,
			passporturl text NOT NUL,
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

	await pool.end();
}

createTbles()
