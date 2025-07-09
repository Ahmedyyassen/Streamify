import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../constants/env.js";


export const generateJWT= (payload)=>{
    return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "7d" });
}