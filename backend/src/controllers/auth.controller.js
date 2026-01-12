import { createToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullName, email, password, phoneNumber } = req.body;

  try {
    // * check if all fields has been filled
    if (!fullName || !email || !password || !phoneNumber) {
      return res.staus(400).json({ message: "All Fields Need to Be Filled." });
    }

    // * password is less than min 6 letters
    if (password.length < 6) {
      return res
        .staus(400)
        .json({ message: "Password must be greater than 6 characters" });
    }

    const existEmailUser = await User.findOne({ email });

    //* check if Email Used
    if (existEmailUser) {
      return res.status(400).json({ message: "Email is already in use." });
    }

    //* generate salt
    const salt = await bcrypt.genSalt(10);

    // * hashing passeord
    const hashedPassword = await bcrypt.hash(password, salt);

    // * creating now the user
    const newUser = User({
      email,
      fullName,
      password: hashedPassword,
      phoneNumber,
    });

    if (newUser) {
      createToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (err) {
    console.error(`Error: ${err.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials." });
    }

    createToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      profilePic: user.profilePic,
      message: "Login Successfully.",
    });
  } catch (err) {
    console.error("Error in login controller", err);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged Out Successfully." });
  } catch (err) {
    console.error("Error in logout controller", err);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    console.error("Error on Checking Auth, ", err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
