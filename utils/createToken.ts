import jwt from "jsonwebtoken";
import type {Response} from "express";

export default async function createAuthToken(res: Response, userId: any) {
  const jwtsecret = process.env.JWT_SECRET as string;

  let token = jwt.sign({ userId }, jwtsecret, {
    expiresIn: "30d",
  });

  res.cookie("jwtAuth", token, {
    //production
    httpOnly: true,
    sameSite: "none",
    secure: true,
    path: "/",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    /*
       //local devlopment
       httpOnly: true,
       sameSite: "lax",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
       */
  });

  return token;
}
