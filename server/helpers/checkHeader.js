const checkHeader = (req, res, next) => {
  const tokenFromHeader = req.get('Authorization');
  if (tokenFromHeader !== 'admin') {
    res.status(401).json({
      error: 'You don not have the access to create a party',
    });
    return;
  }
  next();
};

export default checkHeader;
