import ConnectionMessage from "../models/connection.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";
export const requestToMesssage = async (req, res) => {
  const requester = req.user._id;
  const { phoneNumber } = req.body;

  try {
    const haveUser = await User.findOne({
      phoneNumber,
    });

    if (!haveUser) {
      return res
        .status(400)
        .json({ message: "No User Found. Unable to send Message Request." });
    }

    if (haveUser._id.equals(requester)) {
      return res.status(400).json({
        message:
          "You cannot request a message for your self. ikaw na yan ehh tanga ka?",
      });
    }

    const requestMessage = await ConnectionMessage({
      requester,
      recipient: haveUser._id,
    });

    if (requestMessage) {
      requestMessage.save();

      return res
        .status(201)
        .json({ message: "Request have been successfully send." });
    }
  } catch (err) {
    console.err("Error connection Message", err.message);

    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getRequestMessage = async (req, res) => {
  const myID = req.user._id;

  try {
    const myRequestMessage = await ConnectionMessage.find({
      recipient: myID,
    });

    if (myRequestMessage) {
      return res.status(200).json({ data: myRequestMessage });
    }
  } catch (err) {
    console.error("Error connection Message", err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const acceptRequestMesssage = async (req, res) => {
  const { id } = req.params;
  const status = "accepted";

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ success: false, message: "Invalid Book ID." });
      return;
    }

    const acceptUser = await ConnectionMessage.findByIdAndUpdate(
      id,
      {
        status,
      },
      { new: true }
    );

    if (acceptUser) {
      return res
        .status(200)
        .json({ message: `User is Successfully ${status}` });
    }
  } catch (err) {
    console.error("Error connection Message", err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const rejectRequestMesssage = async (req, res) => {
  const { id } = req.params;
  const status = "rejected";

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ success: false, message: "Invalid Book ID." });
      return;
    }

    const acceptUser = await ConnectionMessage.findByIdAndUpdate(
      id,
      {
        status,
      },
      { new: true }
    );

    if (acceptUser) {
      return res
        .status(200)
        .json({ message: `User is Successfully ${status}` });
    }
  } catch (err) {
    console.error("Error connection Message", err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
