import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from 'express';
import userModel from "../model/user.model.ts";

const authMiddleware = async (req: Request, res: Response, next: NextFunction ) => {
  const token = req.cookies.jwtAuth;
  if (token) {
    try {
      const jwtSecret = process.env.JWT_SECRET as string;
      const decoded =  jwt.verify(token, jwtSecret) as any;
     

      req.user = await userModel.findById(decoded.userId) as any;
      next();
    } catch (error) {
      res.status(401).json({message: "Unauthorized token, token failed ."});
    }
  } else {
     res.status(401).json({message: "Unauthorized token, no token ."});
  }
};

export default authMiddleware;
