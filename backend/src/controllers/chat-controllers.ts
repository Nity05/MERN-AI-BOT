import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureGemini } from "../config/gemini-config.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

// generate chat completion using Gemini
export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;

  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res.status(401).json({
        message: "User not registered OR Token malfunctioned",
      });

    // grab chats of user
    const chats = user.chats.map(({ role, content }) => `${role}: ${content}`).join("\n");
    const prompt = `${chats}\nuser: ${message}`;

    // configure Gemini
    const gemini = configureGemini();
const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" }); // Changed to gemini-1.5-flash    // get latest response
    const result = await model.generateContent(prompt);
    const aiResponse = result.response.text();

    // update user chats
    user.chats.push({ content: message, role: "user" });
    user.chats.push({ content: aiResponse, role: "assistant" });

    await user.save();

    return res.status(200).json({ chats: user.chats });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong", cause: error.message });
  }
};

// send chat history to user
export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error: any) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

// delete all chats for a user
export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    //@ts-ignore
    user.chats = [];
    await user.save();

    return res.status(200).json({ message: "OK" });
  } catch (error: any) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
