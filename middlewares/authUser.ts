import jwt from "jsonwebtoken";
import userModel from "../model/user.model.ts";

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.jwtAuth;
  if (token) {
    try {
      const jwtSecret = process.env.JWT_SECRET as string;
      const decoded =  jwt.verify(token, jwtSecret);
     

      req.user = await userModel.findById(decoded.userId);
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Unauthorized token, token failed .");
    }
  } else {
    res.status(401);
    throw new Error("Unauthorized token, no token .");
  }
};

export default authMiddleware;
