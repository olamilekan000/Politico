
export default class DbQueryOffice {
  static registerUserForAnOffice(office, name, email) {
    const query = {
      text: 'INSERT INTO office (office, name, email) VALUES ($1, $2, $3)',
      values: [office, name, email],
    };
    return query;
  }

  static getUserWithUserID(id) {
    const query = {
		  text: 'SELECT * FROM office WHERE name=$1',
		  values: [id],
    };
    return query;
  }
}
