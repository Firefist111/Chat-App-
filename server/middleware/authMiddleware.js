import jwt from "jsonwebtoken";
import { asyncHandler } from "../config/asyncHandler.js";
import { errorHandler } from "../config/errorhandler.js";

export const Authenticate = asyncHandler(async (req, res, next) => {
  let token;

  if (req.cookies?.token) {
    token = req.cookies.token;
  }

  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new errorHandler("Not authorized, token missing", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    

    
    
    req.user = decoded; // { id: userId }

    next();
  } catch (err) {
    return next(new errorHandler("Invalid or expired token", 401));
  }
});
