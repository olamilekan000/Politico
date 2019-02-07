import { Pool } from 'pg';

const insertIntoVotes = async (Uid) => {
  try {
    // statements
    const pool = new Pool();

    await pool.query({
      text: `INSERT INTO votes (
				office, 
				candidate, 
				voter)
				VALUES($1, $2, $3)`,
      values: [
        1030,
        5056,
        Uid,
      ],
    });

    await pool.query({
      text: `INSERT INTO votes (
				office, 
				candidate, 
				voter)
				VALUES($1, $2, $3)`,
      values: [
        1029,
        5055,
        Uid,
      ],
    });

    await pool.query({
      text: `INSERT INTO votes (
				office, 
				candidate, 
				voter)
				VALUES($1, $2, $3)`,
      values: [
        1028,
        5054,
        Uid,
      ],
    });

    await pool.query({
      text: `INSERT INTO votes (
				office, 
				candidate, 
				voter)
				VALUES($1, $2, $3)`,
      values: [
        1027,
        5053,
        Uid,
      ],
    });
  } catch (e) {
    // statements
    throw e;
  }
};

export default insertIntoVotes;
