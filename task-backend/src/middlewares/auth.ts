import e, { NextFunction, Request, Response } from "express"
import JWT from "jsonwebtoken"
import { JWT_SECRET } from "../config"
import User from "../models/User"

export const jwtVerify = async(req: Request, res:Response,next: NextFunction) => {
    const authToken = req.headers.authorization?.split("Bearer ")[1]

    if (typeof authToken === "string") {
        const data:any = JWT.verify(authToken, JWT_SECRET)
        
        res.locals.user_id = data.id
        next();
    } else {
    return res.status(401).json({ message: "UnAuthorized" });
    }
}

export const adminAccess = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "UnAuthorized! Only Admin Can Access this route" });
    }

    const authToken = authHeader.split("Bearer ")[1];
    if (!authToken) {
      return res.status(401).json({ message: "UnAuthorized! Only Admin Can Access this route" });
    }

    const decodedToken = JWT.verify(authToken, JWT_SECRET) as { id: string };
    const userId = decodedToken.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "UnAuthorized! Only Admin Can Access this route" });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ message: "UnAuthorized! Only Admin Can Access this route" });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "UnAuthorized" });
  }
};