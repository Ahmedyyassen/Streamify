import AsyncHandler from "../middleware/AsyncHandler.js";
import User from "../models/User.model.js";
import AppError from "../utils/AppError.js";
import { loginValidate, onbordingValidate, signUpValid } from "../lib/Joi.js";
import { statusCode } from "../utils/statusCode.js";
import { NODE_ENV } from "../constants/env.js";
import { generateJWT } from "../lib/JWT.js";
import randomAvatar from "../utils/Avatar.js";
import { upsertStreamUser } from "../lib/stream.js";

export const signupCtrl = AsyncHandler(async (req, res, next) => {
  const { fullName, email, password } = req.body;

  const { error } = signUpValid(req.body);
  if (error) {
    const err = AppError.create(
      400,
      error.details[0].message,
      statusCode["400"]
    );
    return next(err);
  }
  const user = await User.findOne({ email });
  if (user) {
    const err = AppError.create(400, "User Alearady Exists", statusCode["400"]);
    return next(err);
  }
  const newUser = await User.create({
    fullName,
    email,
    password,
    profilePic: randomAvatar,
  });

  await upsertStreamUser({
    id: newUser._id.toString(),
    name: newUser.fullName,
    image: newUser.profilePic,
  })
    .then(() => {
      console.log("stream user created for " + newUser.fullName);
    })
    .catch((err) => {
      console.log("error while creating stream user", err);
    });

  const token = generateJWT({ userId: newUser._id });
  const tokenOptions = {
    httpOnly: true, // prevent XSS attacks
    sameSite: "strict", // prevent CSRF attacks
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: NODE_ENV === "production",
  };
  res.cookie("jwt", token, tokenOptions).status(201).json({
    status: "success",
    message: "User Created Successfully",
    data: newUser,
  });
});

export const loginCtrl = AsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const {error} = loginValidate(req.body);
  if (error) {
    const err = AppError.create(
      400,
      error.details[0].message,
      statusCode["400"]
    );
    return next(err);
  }
  const user = await User.findOne({ email });
  if (!user) {
    const err = AppError.create(
      401,
      "Invalid Email or Password",
      statusCode["401"]
    );
    return next(err);
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    const err = AppError.create(
      401,
      "Invalid Email or Password",
      statusCode["401"]
    );
    return next(err);
  }
  const token = generateJWT({ userId: user._id });
  const tokenOptions = {
    httpOnly: true, // prevent XSS attacks
    sameSite: "strict", // prevent CSRF attacks
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: NODE_ENV === "production",
  };
  res.cookie("jwt", token, tokenOptions).status(200).json({
    status: statusCode["200"],
    message: "Logged In Successfully",
    data: user,
  });
});

export const logoutCtrl = AsyncHandler(
    async(req, res, next)=>{
      delete req.user;
      res.clearCookie("jwt").status(200).json({
            status: statusCode["200"],
            message: "Logged Out Successfully"})
    })

export const onboardingCtrl = AsyncHandler(
  async(req, res, next)=>{
    const userId = req.user._id;

    const {error} = onbordingValidate(req.body);
    if (error) {
      const err = AppError.create(400, error.details[0].message, statusCode["400"]);
      return next(err);
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...req.body,
        isOnboarded: true,
      },
      { new: true }
    );
    if (!updatedUser) {
      const err = AppError.create(404, error.details[0].message, statusCode["404"]);
      return next(err);
    }
    // TODO: update stream user info

    await upsertStreamUser({
    id: updatedUser._id.toString(),
    name: updatedUser.fullName,
    image: updatedUser.profilePic,
  })
    .then(() => {
      console.log("stream user created for " + updatedUser.fullName);
    })
    .catch((err) => {
      console.log("error while creating stream user", err);
    });

    
    res.status(200).json({
      status: statusCode["200"],
      message: "Onboarding Completed Successfully",
      data: updatedUser,
    });
  }
)