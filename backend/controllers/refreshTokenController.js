import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Employee } from '../models/association.js';

dotenv.config();

const handleRefreshToken = async (req, res) => {
  const { cookies } = req;
  if (!cookies?.refreshToken) return res.sendStatus(401);
  const { refreshToken } = cookies;
  const foundUser = await Employee.findOne({ where: { refreshToken } });
  if (!foundUser) return res.sendStatus(403); // Forbidden
  // evaluate jwt
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
      const accessToken = jwt.sign(
        { id: foundUser.id, email: foundUser.email, role: foundUser.role, },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '10m' },
      );
      res.json({ token: accessToken });
    },
  );
};

export default handleRefreshToken;