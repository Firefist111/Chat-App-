import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { generateToken, hashPassword } from "../config/utility.js";
import { asyncHandler } from "../config/asyncHandler.js";
import { errorHandler } from "../config/errorhandler.js";
import cloudinary from "../config/cloudinary.js";

export const register = asyncHandler(async (req, res, next) => {
  const { fullName, userName, password } = req.body;

  if (!fullName || !userName || !password ) {
    return next(new errorHandler("Input field missing", 400));
  }

  const user = await User.findOne({ userName });
  if (user) {
    return next(new errorHandler("User exists", 400));
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await User.create({
    userName,
    password: hashedPassword,
    fullName
  });

  const token = generateToken(newUser._id);

  res
    .status(201)
    .cookie("token", token, {
      httpOnly: true, // prevents JS access
      sameSite: "strict", // CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    .json({
      success: true,
      message: "User created",
    });
});

export const login = asyncHandler(async (req, res, next) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return next(new errorHandler("Input field missing", 400));
  }

  const user = await User.findOne({ userName });
  if (!user) {
    return next(new errorHandler("Enter a valid username or password", 401));
  }

  const passwordStatus = await bcrypt.compare(password, user.password);
  if (!passwordStatus) {
    return next(new errorHandler("Password does not match", 401));
  }

  const token = generateToken( user._id );

  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true, // prevents JS access
      sameSite: "strict", // CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    .json({
      success: true,
      message: "Login successfull",
      user
    });
});

export const logout = asyncHandler(async (req, res, next) => {
  
  res
    .status(200)
    .cookie("token", "", {
      httpOnly: true, // prevents JS access
      sameSite: "strict", // CSRF protection
      maxAge: new Date(0)
    })
    .json({
      success: true,
      message: "Logout successfull",
    });
});


export const getUser = asyncHandler(async (req, res, next) => {
  
  const userId = req.user.id;

  const user = await User.findById(userId)
  
  if(!user){
    return next(new errorHandler('user does not exists',401))
  }
  res.status(200).json({
    success : true,
    user
  })
});


export const getOtherUser = asyncHandler(async (req, res, next) => {
  
  const userId = req.user.id;

  const user = await User.find({_id : {$ne : userId}})

  res.status(200).json({
    success : true,
    user
  })
});


export const updateProfile = asyncHandler(async(req,res,next)=>{
  const {avatar} = req.body
  const userId = req.user.id;
  if(!avatar){
     return next(new errorHandler("Profile pic not exists", 401));
  }

  const response = await cloudinary.uploader.upload(avatar)
  const updatedUser = await User.findByIdAndUpdate(userId,{avatar : response.secure_url},{new : true})

  res.status(200).json({
    success: true,
    user : updatedUser,
    message : "Profile updated successfully"
  });
})