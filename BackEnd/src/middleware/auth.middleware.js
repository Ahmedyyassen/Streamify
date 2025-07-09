import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import { statusCode } from "../utils/statusCode.js";
import { JWT_SECRET_KEY } from "../constants/env.js";
import User from "../models/User.model.js";



export const protectedRoute = async(req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            const err = AppError.create(
              401,
              "Not authorized - No token provided",
                statusCode["401"]
            );
            return next(err);
        }
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        if (!decoded) {
            const err = AppError.create(
              401,
              "Not authorized - Invalid token",
                statusCode["401"]
            );
            return next(err);
        }
        const user = await User.findById(decoded.userId).select("-password");
            if (!user) {
            const err = AppError.create(
              401,
              "Not authorized - User not found",
                statusCode["401"]
            );
            return next(err);
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectedRoute middleware: ", error);
        const err = AppError.create(
          500,
          "Internal Server Error",
          statusCode["500"]
        );
        return next(err);
    }
    } 