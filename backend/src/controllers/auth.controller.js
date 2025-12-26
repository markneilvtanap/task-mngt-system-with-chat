import { createToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    // * check if all fields has been filled
    if (!fullName || !email || !password) {
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

export const login = () => {};

export const logout = () => {};
