const checkHeader = (req, res, next) => {
  const tokenFromHeader = req.get('Authorization');
  console.log(tokenFromHeader);
  if (tokenFromHeader !== 'admin') {
    res.status(401).json({
      status: 401,
      error: 'You don not have the access to create a party',
    });
    return;
  }
  next();
};

export default checkHeader;
