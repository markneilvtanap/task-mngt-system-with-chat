import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useTaskStore = create((set, get) => ({
  tasks: [],
  isTaskLoading: false,
  isCreatingTask: false,

  /* =========================
     FETCH ALL TASKS
  ========================= */
  fetchAllTasks: async () => {
    set({ isTaskLoading: true });

    try {
      const res = await axiosInstance.get("/tasks/");
      set({ tasks: res.data.tasks });

      console.log("Fetched tasks:", res.data.tasks);
    } catch (error) {
      console.error("Error fetching all tasks:", error);
      toast.error("Failed to load tasks");
    } finally {
      set({ isTaskLoading: false });
    }
  },

  /* =========================
     CREATE TASK
  ========================= */
  createTask: async (taskData) => {
    set({ isCreatingTask: true });

    try {
      const res = await axiosInstance.post("/tasks", taskData);

      // Optimistic update
      set((state) => ({
        tasks: [res.data, ...state.tasks],
      }));

      toast.success("Task created successfully");

      // Close modal after success
      const modal = document.getElementById("my_modal_5");
      modal?.close();
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error(error?.response?.data?.message || "Failed to create task");
    } finally {
      set({ isCreatingTask: false });
    }
  },

  /* =========================
     MODAL CONTROL
  ========================= */
  controlModal: () => {
    const modal = document.getElementById("my_modal_5");
    if (modal) {
      modal.showModal();
    } else {
      console.error("Modal element not found");
    }
  },
}));
