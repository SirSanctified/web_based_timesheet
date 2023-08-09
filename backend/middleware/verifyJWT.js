import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function verifyJWT(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); // invalid token (forbidden)
    // get the decoded payload and allow the user to continue
    req.user = decoded;
    next();
  });
}
