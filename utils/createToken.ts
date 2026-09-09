import jwt from "jsonwebtoken";

export default async function createAuthToken(res: any, userId: any) {
  const jwtsecret = process.env.JWT_SECRET as string;

  let token = jwt.sign({ userId }, jwtsecret, {
    expiresIn: "7d",
  });

  res.cookie("jwtAuth", token, {
    //production
    httpOnly: true,
    sameSite: "none",
    secure: true,
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
