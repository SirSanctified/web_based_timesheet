import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Employee } from '../models/association.js';

dotenv.config();

const handleRefreshToken = async (req, res) => {
  const { cookies } = req;
  if (!cookies?.refreshToken) return res.sendStatus(401);
  console.log(cookies);
  const { refreshToken } = cookies;
  // const foundUser = await Employee.findOne({ where: { refreshToken }, raw: true,});
  // console.log(foundUser);
  // if (!foundUser) return res.sendStatus(403); // Forbidden
  // evaluate jwt
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err) return res.sendStatus(403);
      const accessToken = jwt.sign(
        { id: decoded.id, email: decoded.email, role: decoded.role, },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '10m' },
      );
      res.json({ token: accessToken });
    },
  );
};

export default handleRefreshToken;