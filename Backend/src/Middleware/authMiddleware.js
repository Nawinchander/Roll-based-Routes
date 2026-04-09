// exports.verifyToken = (req, res, next) => {
//   const token = req.cookies.accessToken || req.headers.authorization;
//   // validate JWT here
// };



const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token =
    req.cookies.accessToken || req.headers.authorization;

  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.sendStatus(403);
  }
};