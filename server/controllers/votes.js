import jwt from 'jsonwebtoken';
import pool from '../../config';

class VoteCandidate {
  static async vote(req, res) {
    const getToken = req.get('Authorization');
    const verifiedToken = jwt.verify(getToken, process.env.TOKEN);
    const { candidate, office } = req.body;

    try {
      // checks if the voter has voted before

      const checkVoterdbQuery = await pool.query({
        text: 'SELECT * FROM votes WHERE voter=$1 AND candidate=$2 AND office=$3',
        values: [verifiedToken.id, candidate, office],
      });

      if (checkVoterdbQuery.rowCount !== 0) {
        return res.status(409).json({
          status: 'conflict',
          error: 'The voter has previously voted for the candidate',
        });
      }

      const query = await pool.query({
        text: `INSERT INTO votes (
					office, 
					candidate, 
					voter)
					VALUES($1, $2, $3)`,
        values: [
          office,
          candidate,
          verifiedToken.id,
        ],
      });

      const dbQuery = await pool.query({
        text: 'SELECT * FROM votes WHERE voter=$1 AND candidate=$2',
        values: [verifiedToken.id, candidate],
      });

      return res.status(200).json({
        data: {
          ...dbQuery.rows[0],
        },

      });
    } catch (e) {
      throw e;
    }
  }
}

export default VoteCandidate;
