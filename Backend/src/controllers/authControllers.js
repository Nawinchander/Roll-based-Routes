// exports.login = async (req, res) => {
//   // generate access + refresh token
//   // set cookie here
// };


const User = require("../models/User");
const bcrypt = require("bcryptjs");
const {
  generateAccessToken,
  generateRefreshToken
} = require("../services/tokenService");
const cookieOptions = require("../utils/cookieOptions");

exports.register = async (req, res) => {
  const { email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({ email, password: hashed });

  res.json(user);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.sendStatus(401);

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.sendStatus(401);

  const payload = { id: user._id, role: user.role };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  res.cookie("refreshToken", refreshToken, cookieOptions);

  res.json({ accessToken, role: user.role });
};

exports.refresh = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  try {
    const user = require("jsonwebtoken").verify(
      token,
      process.env.REFRESH_SECRET
    );

    const accessToken = generateAccessToken({
      id: user.id,
      role: user.role
    });

    res.json({ accessToken });
  } catch {
    res.sendStatus(403);
  }
};

exports.logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.sendStatus(200);
};