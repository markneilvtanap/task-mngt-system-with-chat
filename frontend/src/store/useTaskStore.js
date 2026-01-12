import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useTaskStore = create((set, get) => ({
  tasks: [],
  isTaskLoading: false,

  fetchAllTasks: async () => {
    set({ isTaskLoading: true });

    try {
      const res = await axiosInstance.get("/tasks/");

      console.log(res);
    } catch (error) {
      console.error("Error fetching all tasks:", error);
    }
  },
}));
