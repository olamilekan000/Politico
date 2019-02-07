import { Pool } from 'pg'
import dbconfig from './dbConfig'

const pool = new Pool(dbconfig)

export default pool
