import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useTaskStore = create((set, get) => ({
  tasks: [],
  isTaskLoading: false,
  isCreatingTask: false,
  isEditingTask: false,
  editTaskID: null,
  fetchAllTasks: async () => {
    set({ isTaskLoading: true });
    const dropdown = document.getElementById("dropdown-menu");
    try {
      const res = await axiosInstance.get("/tasks");
      set({ tasks: res.data.tasks });
    } catch (error) {
      console.error("Error fetching all tasks:", error);
      toast.error("Failed to load tasks");
    } finally {
      dropdown?.removeAttribute("open");
      set({ isTaskLoading: false });
    }
  },

  fetchSelfTasks: async () => {
    set({ isTaskLoading: true });
    const dropdown = document.getElementById("dropdown-menu");
    try {
      const res = await axiosInstance.get("/tasks/created-by-me");

      set({ tasks: res.data.selfTask });
      // set({tasks : res.data})
    } catch (error) {
      console.error("Error fetching self tasks:", error);
      toast.error("Failed to load self tasks");
    } finally {
      dropdown?.removeAttribute("open");
      set({ isTaskLoading: false });
    }
  },

  fetchAssignedMeTasks: async () => {
    const dropdown = document.getElementById("dropdown-menu");
    try {
      set({ isTaskLoading: true });

      const res = await axiosInstance.get("/tasks/assigned-to-me");

      set({ tasks: res.data.myAssignedTask });
    } catch (error) {
      console.error("Error fetching Assiged to me tasks:", error);
      toast.error("Failed to load Assiged to me tasks");
    } finally {
      dropdown?.removeAttribute("open");
      set({ isTaskLoading: false });
    }
  },

  fetchAssignedOthersfTasks: async () => {
    const dropdown = document.getElementById("dropdown-menu");
    try {
      set({ isTaskLoading: true });

      const res = await axiosInstance.get("/tasks/assigned-by-me");

      set({ tasks: res.data.assignedToOthers });
    } catch (error) {
      console.error("Error fetching Assiged to me tasks:", error);
      toast.error("Failed to load Assiged to me tasks");
    } finally {
      dropdown?.removeAttribute("open");
      set({ isTaskLoading: false });
    }
  },

  createTask: async (taskData) => {
    const { tasks } = get();
    set({ isCreatingTask: true });

    try {
      const res = await axiosInstance.post("/tasks", taskData);

      console.log("Task created:", res.data);

      set({
        tasks: [...tasks, res.data],
      });

      toast.success("Task created successfully");

      const modal = document.getElementById("my_modal_5");
      modal?.close();
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error(error?.response?.data?.message || "Failed to create task");
    } finally {
      set({ isCreatingTask: false });
    }
  },

  editTask: async (taskID, updatedTaskData) => {
    const prevTasks = get().tasks;

    set({
      isEditingTask: true,
      tasks: prevTasks.map((task) =>
        task._id === taskID ? { ...task, ...updatedTaskData } : task
      ),
    });

    try {
      await axiosInstance.put(`tasks/${taskID}`, updatedTaskData);
      toast.success("Task edited successfully");
    } catch (error) {
      set({ tasks: prevTasks });
      toast.error("Failed to edit task");
    } finally {
      set({ isEditingTask: false });
    }
  },

  setEditTaskID: (editTaskID) => {
    set({ editTaskID });
  },

  deleteTask: async (taskId) => {
    set({ isTaskLoading: true });
    try {
      const res = await axiosInstance.delete(`tasks/${taskId}`);

      set((state) => ({
        tasks: state.tasks.filter((task) => task._id !== taskId),
      }));
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error(error?.response?.data?.message || "Failed to delete task");
    } finally {
      set({ isTaskLoading: false });
    }
  },

  controlModal: (modalID) => {
    const modal = document.getElementById(modalID);
    const dropdown = document.getElementById("dropdown-menu");
    dropdown?.removeAttribute("open");

    if (modal) {
      modal.showModal();
    } else {
      console.error("Modal element not found");
    }
  },
}));
