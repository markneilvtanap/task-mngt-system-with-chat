import mongoose from "mongoose";
import Task from "../models/task.model.js";

export const createTask = async (req, res) => {
  const { title, description, status, assignedTo } = req.body;

  try {
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Please Fill the Required Fields" });
    }

    const assigned =
      assignedTo && mongoose.Types.ObjectId.isValid(assignedTo)
        ? new mongoose.Types.ObjectId(assignedTo)
        : "me";

    const newTask = Task({
      title,
      description,
      status,
      createdBy: req.user._id,
      assignedTo: assigned,
    });

    if (newTask) {
      await newTask.save();

      console.log("New Task Created:", newTask);
      return res.status(201).json({
        _id: newTask._id,
        title: newTask.title,
        description: newTask.description,
        assignedTo: newTask.assignedTo,
        status: newTask.status,
        createdAt: newTask.createdAt,
        createdBy: newTask.createdBy,
        message: "Created New Task.",
      });
    }
  } catch (err) {
    console.error(`Error ${err.message}`);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

export const editTask = async (req, res) => {
  const { id } = req.params;
  const updatedTaskData = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Task ID." });
  }

  try {
    const updateTask = await Task.findByIdAndUpdate(id, updatedTaskData, {
      new: true,
    });

    return res
      .status(200)
      .json({ message: "Updated the Task Successfully.", data: updateTask });
  } catch (err) {
    console.error(`Error Editing Task ${err.message}`);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const deletingUserId = req.user._id;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Task ID." });
    }

    const createdByTaskID = await Task.findById(id).select("createdBy");

    if (!createdByTaskID.createdBy.equals(deletingUserId)) {
      return res
        .status(400)
        .json({ message: "You are not Authorized to Delete this Task." });
    }

    const deleteTask = await Task.findByIdAndDelete(id);

    if (deleteTask) {
      return res.status(200).json({ message: "Deleted Task Successfully." });
    }
  } catch (err) {
    console.error(`Error Deleting Task ${err.message}`);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

export const getAllTask = async (req, res) => {
  try {
    const tasks = await Task.find({
      createdBy: req.user._id,
    });

    if (tasks) {
      return res.status(200).json({ tasks });
    }
  } catch (err) {
    console.error(`Error Fetching All Task ${err.message}`);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

export const getAssignedTask = async (req, res) => {
  const myID = req.user._id;
  try {
    const myAssignedTask = await Task.find({
      assignedTo: myID,
    });

    if (myAssignedTask) {
      return res.status(200).json({ myAssignedTask });
    }
  } catch (err) {
    console.error(`Error Fetching  my assigned Task ${err.message}`);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

export const getSelfTask = async (req, res) => {
  const myID = req.user._id;

  try {
    const selfTask = await Task.find({
      $and: [{ createdBy: myID }, { assignedTo: "me" }],
    });

    if (selfTask) {
      return res.status(200).json({ selfTask });
    }
  } catch (err) {
    console.error(`Error Fetching  my self Task ${err.message}`);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};
export const getAssignedToOthersTask = async (req, res) => {
  const myID = req.user._id;

  try {
    const assignedToOthers = await Task.find({
      $and: [{ createdBy: myID }, { assignedTo: { $ne: "me" } }],
    });

    if (assignedToOthers) {
      return res.status(200).json({
        assignedToOthers,
      });
    }
  } catch (err) {
    console.error(`Error Fetching  Assigned To Others ${err.message}`);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};
