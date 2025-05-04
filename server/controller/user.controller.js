import { User } from "../model/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const generateAccessRefreshToken = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(400, "User not found!");
  }

  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;

  if ([name, username, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  //   check if the user is already exist
  const existUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existUser) {
    throw new ApiError(409, "User already exist");
  }

  //   create user
  const user = await User.create({
    name: name,
    username: username.toLowerCase(),
    email: email,
    password: password,
  });

  // send response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(400, "Something went wrong while creating user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User created successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username && !email) {
    throw new ApiError(400, "Username or email required!");
  }

  const checkUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!checkUser) {
    throw new ApiError(404, "User not found!");
  }

  const checkPassword = await checkUser.isPasswordCorrect(password);

  if (!checkPassword) {
    throw new ApiError(400, "Password is not correct!");
  }

  const { accessToken, refreshToken } = await generateAccessRefreshToken(
    checkUser?._id
  );

  const loggedUser = await User.findById(checkUser?._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, loggedUser, "User logged in successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
  const user = req.user?.id;

  if (!user) {
    throw new ApiError(401, "Unauthorized request");
  }

  await User.findByIdAndUpdate(
    user,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
      validateBeforeSave: false,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logout successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingToken = req.cookies?.refreshToken;
  console.log(incomingToken);

  if (!incomingToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decoded = jwt.verify(incomingToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decoded?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token expired");
    }

    const { accessToken, refreshToken } = await generateAccessRefreshToken(
      user?._id
    );

    console.log(accessToken, " And ", refreshToken);

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const options = {
      httpOnly: true, //it restrict the JS on the browser to access this cookie
      secure: true, // it ensure the cookies are only sent over HTTPS
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken },
          "Access token refresh successfully"
        )
      );
  } catch (error) {
    throw new ApiError(400, error?.message, "Invalid refresh token");
  }
});

const checkUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User is present"));
});

export { registerUser, loginUser, logoutUser, refreshAccessToken, checkUser };
