import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  task: null,
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");

      console.log("Users for Sidebar: ", res.data);
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId, task) => {
    set({ isMessagesLoading: true });

    try {
      const res = await axiosInstance.get(
        `/messages/${userId}/task/${task._id}`,
      );
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData, taskID) => {
    const { selectedUser, messages } = get();

    console.log("Selected User in sendMessage: ", selectedUser._id);
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}/task/${taskID}`,
        messageData,
      );

      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.off("newMessage"); // remove previous listeners

    socket.on("newMessage", (newMessage) => {
      const { selectedUser } = get();

      const isChatMessage =
        newMessage.senderId === selectedUser._id ||
        newMessage.receiverId === selectedUser._id;

      if (!isChatMessage) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  toChatTask: async (taskId) => {
    const { setSelectedUser } = get();

    const res = await axiosInstance.get(`auth/my-data/${taskId}`);

    console.log("toChatTask: ", res.data);

    setSelectedUser(res.data);
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  setTaskForChat: (task) => set({ task }),
}));
