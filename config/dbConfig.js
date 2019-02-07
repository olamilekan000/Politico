import dotenv from 'dotenv'

dotenv.config()

const db  = {
	development: {
		user: process.env.PGUSER || 'postgres',
		host: process.env.PGHOST || 'localhost',
		database: process.env.ENV_TEST  == 'test' ? process.env.PGDATABASETEST : process.env.PGDATABASE,
		password: process.env.PGPASSWORD || '',
		port:process.env.PGPORT || 5432
	},
	heroku: {
		connectionString: process.env.DATABASE_URL
	}
}

const env = process.env.ENV === 'heroku' ? 'heroku': 'development'

const dbconfig = db[env]

export default dbconfig
