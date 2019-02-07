import pool from '../../config'

const deleteDatabase = async () => {
  await pool.query({ text: 'DROP TABLE users' });
};

export default deleteDatabase;
