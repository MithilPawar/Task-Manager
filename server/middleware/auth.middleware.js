import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
  // Get token from cookie or Authorization header
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "No token provided");
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Find the user from the decoded token
    const user = await User.findById(decoded?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Attach user to request object
    req.user = user;

    // Proceed to next middleware
    next();
  } catch (error) {
    // Token is invalid or expired
    throw new ApiError(401, "Invalid or expired token");
  }
});

export { verifyJWT };
