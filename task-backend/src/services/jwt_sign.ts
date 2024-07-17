import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { IUser } from "../models/User";

export const signJwt = (user: IUser) => {
    const token =  jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: '3h'});
    
    return token;
}