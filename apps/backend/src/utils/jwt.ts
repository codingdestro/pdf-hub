import * as jose from "jose";
import { createSecretKey } from "node:crypto";

export type TUser = {
  user_id: string;
  email: string;
};

const SECRET_KEY = process.env.SECRET_KEY || "s3r3t";
const secret = createSecretKey(Buffer.from(SECRET_KEY, "utf-8"));

export const createToken = async (user: TUser) => {
  const jwt = await new jose.SignJWT(user)
    .setProtectedHeader({ alg: "HS256" }) // HMAC-SHA256
    .setIssuedAt()
    .setExpirationTime("1d") // or '1d', '30m'
    .sign(secret);
  return jwt;
};

export const verifyToken = async (token: string) => {
  try {
    const { payload } = await jose.jwtVerify<TUser>(token, secret);
    return payload;
  } catch (error) {
    console.log("failed to verify token");
    throw error;
  }
};
