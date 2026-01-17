import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { generateToken, hashPassword } from "../config/utility.js";
import { asyncHandler } from "../config/asyncHandler.js";
import { errorHandler } from "../config/errorhandler.js";
import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import { getSocketId, io } from "../socketIO/socket.js";

export const getMessage = asyncHandler(async (req, res, next) => {
  const senderId = req.user.id;
  const receiverId = req.params.receiverId;

  if (!senderId || !receiverId) {
    return next(
      new errorHandler("Input field missing to receive message", 400)
    );
  }

  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  }).populate("messages");

  res.status(200).send({
    success: true,
    data: conversation,
  });
});

export const sendMessage = asyncHandler(async (req, res, next) => {
  const message = req.body.message;
  const senderId = req.user.id;
  const receiverId = req.params.receiverId;

  if (!message || !senderId || !receiverId) {
    return next(
      new errorHandler("All fields are required to send message", 401)
    );
  }

  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
    });
  }

  const newMessage = await Message.create({
    senderId,
    receiverId,
    message,
  });

  conversation.messages.push(newMessage._id);
  await conversation.save();

  //socket.io
  const socketId = getSocketId(receiverId);
  if (socketId) {
    io.to(socketId).emit("newMessages", newMessage);
  }

  res.status(200).json({
    success: true,
    message: "Message sent successfully",
    newMessage,
  });
});
