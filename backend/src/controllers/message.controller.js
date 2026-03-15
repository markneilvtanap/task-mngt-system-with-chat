import User from "../models/user.model.js";
import Message from "../models/message.model.js";

import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import ConnectionMessage from "../models/connection.model.js";

export const getUsersForSideBar = async (req, res) => {
  try {
    // const loggedInUserId = req.user._id;
    // const filteredUsers = await User.find({
    //   _id: { $ne: loggedInUserId },
    // }).select("-password");

    const myID = req.user._id;

    const connectedUsers = await ConnectionMessage.find({
      $and: [{ requester: myID }, { status: "accepted" }],
    });

    console.log("Connected Users: ", connectedUsers[0].recipient);

    const toChatUser = await User.findById(connectedUsers[0].recipient).select(
      "-password",
    );

    res.status(200).json(toChatUser);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getOneToOneChatUsers = async (req, res) => {
  try {
    const mID = req.user._id;
    const { id: toChatId } = req.params;
  } catch (error) {}
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId, taskId: taskID } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId, taskId: taskID },
        { senderId: userToChatId, receiverId: myId, taskId: taskID },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { senderId: receiverId, taskId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      // Upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    console.log("taskID: ", taskId);
    console.log("taskID type: ", typeof taskId);
    // checking if accepted
    const isAcceptedChat = await ConnectionMessage.find({
      requester: senderId,
      recipient: receiverId,
    }).select("status");

    if (isAcceptedChat[0].status === "accepted") {
      const newMessage = new Message({
        senderId,
        receiverId,
        taskId,
        text,
        image: imageUrl,
      });

      await newMessage.save();

      const receiverSocketId = getReceiverSocketId(receiverId);


      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }

      
      if (senderId) {
        io.to(senderId).emit("newMessage", newMessage);
      }


      res.status(201).json(newMessage);
    }
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
