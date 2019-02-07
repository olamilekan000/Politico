import jwt from 'jsonwebtoken';
import pool from '../../config';

export default class Petition {
  static async createPetition(req, res) {
    const getToken = req.get('Authorization');
    const verifiedToken = jwt.verify(getToken, process.env.TOKEN);

    req.body.createdOn = new Date().toDateString();

    const query = await pool.query({
      text: `INSERT INTO petitions (
				createdon, 
				createdby, 
				office, 
				body, 
				evidence) 
				VALUES($1, $2, $3, $4, $5)`,
      values: [
        req.body.createdOn,
        verifiedToken.id,
        10001,
        req.body.body,
        req.body.evidence,
      ],
    });

    const queryPetition = await pool.query({
      text: 'SELECT * FROM petitions where createdby=$1',
      values: [verifiedToken.id],
    });

    await pool.end();

    res.status(200).json({
      data: {
        ...queryPetition.rows[0],
      },
    });
  }
}
