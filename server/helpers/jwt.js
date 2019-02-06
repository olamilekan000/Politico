import jwt from 'jsonwebtoken';

const token = (firstname, isAdmin, lastname, email) => jwt.sign({
  iss: 'Politico',
  sub: firstname,
  iat: new Date().getTime(),
  exp: new Date().setDate(new Date().getDate() + 1),
  role: isAdmin ? 'Admin' : 'user',
  firstname,
  lastname,
  email,
}, 'secret');

export default token;
