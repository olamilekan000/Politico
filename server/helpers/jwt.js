import jwt from 'jsonwebtoken';

const token = (firstname, isAdmin, lastname, email, id) => jwt.sign({
  iss: 'Politico',
  sub: firstname,
  iat: new Date().getTime(),
  expiresIn: new Date().setDate(new Date().getDate() + 10),
  role: isAdmin ? 'Admin' : 'user',
  firstname,
  lastname,
  email,
  id,
}, 'secret');

export default token;
