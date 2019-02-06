import { Pool } from 'pg'

const deleteDatabase = async () => {
	const pool = new Pool();
    await pool.query({text: `DROP DATABASE politico`});
    await pool.end();
}

export default deleteDatabase
