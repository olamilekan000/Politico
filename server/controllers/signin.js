import { Pool } from 'pg';
import token from '../helpers/jwt';
import DbQuery from '../model';

import { hashPwd } from '../helpers/pwdHash';

export default class signInUser {
  static async signin(req, res) {
    const Token = token(
      req.user.firstname,
      req.user.isadmin,
      req.user.lastname,
      req.user.email,
    );

    res.status(200).json({
      status: 'Successfully logged in',
      data: [{
        Token,
        user: {
          id: req.user.id,
          firstname: req.user.firstname,
          lastname: req.user.lastname,
          othername: req.user.othername,
          email: req.user.email,
          phonenumber: req.user.phonenumber,
          passporturl: req.user.passporturl,
          isadmin: req.user.isadmin,
        },
      }],
    });
  }
}
