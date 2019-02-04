export const checkHeader = (req, res, next) => {
  const tokenFromHeader = req.get('Authorization');
  if (tokenFromHeader !== 'admin') {
    res.status(401).json({
      error: 'You do not have the access to perform this action',
    });
    return;
  }
  next();
};

export const checkIfUserOrAdmin = (req, res, next) => {
  const tokenFromHeader = req.get('Authorization');
  if (tokenFromHeader === 'user' || tokenFromHeader === 'admin') {
    next();
  } else {
    res.status(401).json({
      error: 'You do not have the access to this resource.',
    });
  }
};
