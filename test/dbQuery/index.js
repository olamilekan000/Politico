
export default class TestDbQuery {
  static Insert(firstname, lastname, othername, email, phonenumber, passporturl, isadmin, password) {
    const query = {
		  text: `INSERT INTO users(firstname, lastname, othername, email, phonenumber, passporturl, isadmin, password) 
		  		VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,
		  values: [firstname, lastname, othername, email, phonenumber, passporturl, isadmin, password],
    };
    return query;
  }

  static getUserWithEmail(email) {
    const query = {
      text: 'SELECT * FROM users WHERE email=$1',
      values: [email],
    };
    return query;
  }

  static deleteUserWithEmail(email) {
    const query = {
      text: 'DELETE FROM users WHERE email=$1',
      values: [email],
    };
    return query;
  }
}
