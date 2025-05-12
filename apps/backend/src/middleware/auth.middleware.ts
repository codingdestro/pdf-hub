import type { NextFunction, Request, Response } from "express";
import { verifyToken, type TUser } from "../utils/jwt";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization || req.headers.cookie;
    if (!token) {
      res.status(401).json({ error: "UnAuthorized access" });
      return;
    }
    const user: TUser = await verifyToken(token);
    res.locals.user = user;
    next();
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "failed to verify token" });
    return;
  }
};
