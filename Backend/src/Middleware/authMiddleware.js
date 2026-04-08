exports.verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken || req.headers.authorization;
  // validate JWT here
};

