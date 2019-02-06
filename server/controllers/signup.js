import { Pool } from 'pg';
import token from '../helpers/jwt';
import DbQuery from '../model';

import { hashPwd } from '../helpers/pwdHash';

export default class signUpUser {
  static async register(req, res) {
    const {
      firstname,
      lastname,
      othername,
      email,
      phoneNumber,
      passportUrl,
      isAdmin,
    } = req.body;

    const pool = new Pool();

    try {
      const queryUserIfExist = DbQuery.getUserWithEmail(email);
      const dbRes = await pool.query(queryUserIfExist);

      if (dbRes.rows[0]) {
        return res.status(409).json({
          error: 'user with that email already exists',
        });
      }

      const password = await hashPwd(req.body.password);
      const queryData = DbQuery.Insert(
        firstname,
        lastname,
        othername,
        email,
        phoneNumber,
        passportUrl,
        isAdmin,
        password,
      );
      await pool.query(queryData);

      const querySavedUser = DbQuery.getUserWithEmail(email);
      const savedUser = await pool.query(querySavedUser);

      const idAdminBool = savedUser.rows[0].isadmin;

      const Token = token(
        savedUser.rows[0].firstname,
        idAdminBool,
        savedUser.rows[0].lastname,
        savedUser.rows[0].email,
        savedUser.rows[0].id
      );

      await pool.end();
      // return the user with the token
      return res.status(200).json({
        Token,
        user: {
          id: savedUser.rows[0].id,
          firstname: savedUser.rows[0].firstname,
          lastname: savedUser.rows[0].lastname,
          othername: savedUser.rows[0].othername,
          email: savedUser.rows[0].email,
          phonenumber: savedUser.rows[0].phonenumber,
          passporturl: savedUser.rows[0].passporturl,
          isadmin: savedUser.rows[0].isadmin,
        },
      });
    } catch (e) {
      // statements
      throw e;
    }
  }
}
