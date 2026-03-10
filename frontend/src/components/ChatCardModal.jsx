import React from "react";
import Sidebar from "./SideBar";
import { useChatStore } from "../store/useChatStore";
import NoChatSelected from "./NoChatSelected";
import ChatContainer from "./ChatContainer";

const ChatCardModal = () => {
  const { selectedUser } = useChatStore();
  return (
    <dialog id="chat-card-modal" className="modal">
      <div className="modal-box w-full max-w-7xl h-full max-h-[90vh] rounded-lg p-0">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        <div className="h-full bg-base-200 ">
          <div className="flex-items-center justify-center">
            <div className="bg-base-100 rounded-lg shadow-cl w-full  h-[calc(100vh-5rem)]">
              <div className="flex h-full rounded-lg overflow-hidden">
                {/* <Sidebar /> */}

                {selectedUser ? <ChatContainer /> : <NoChatSelected />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default ChatCardModal;
