const adminOnly = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('You are not authorized to access this route.');
  }
};

export { adminOnly };
