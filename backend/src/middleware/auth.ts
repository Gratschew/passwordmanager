import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';
import dotenv from "dotenv";
dotenv.config();
const { JWT_KEY } = process.env;

interface AuthRequest extends Request {
  user?: Record<string, any>;
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Retrieve the JWT token from the cookie or header
  const token = req.cookies.token || req.header("x-auth-token");

  // If the token doesn't exist, return an error
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    if(!JWT_KEY){
      throw new Error('JWT_SECRET not set!')
    }
    // Verify the token with the secret key
    const decoded = jwt.verify(token, JWT_KEY) as { userId: string };
    req.user = { userId: decoded.userId };

    // Call the next middleware function
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Token is not valid" });
  }
};
