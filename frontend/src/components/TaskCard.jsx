import { Trash2, Brush } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import { useTaskStore } from "../store/useTaskStore";
import DeleteConfirmCard from "./DeleteConfirmCard";

const TaskCard = ({ task }) => {
  const { allUsers, myID } = useAuthStore();

  const { setDeleteTaskID, setEditTaskID, controlModal } = useTaskStore();

  const handleAssignName = (id) => {
    let name = "Unknown User";

    if (id === myID) return "Me";

    Array.isArray(allUsers) &&
      allUsers.map((user) => {
        if (user._id === id) {
          name = user.fullName;
        }
      });

    return name;
  };

  const handleDelete = (id) => {
    document.getElementById("my_modal_delete").showModal();
    setDeleteTaskID(id);
  };

  const handleEdit = (editId, modalID) => {
    setEditTaskID(editId);

    controlModal(modalID);
  };

  return (
    <div className="card bg-base-100  shadow-xl mx-5 my-3 ">
      <div className="card-header flex justify-between p-5">
        <div className="card-title">Title: {task.title}</div>

        <div className="card-subtitle">
          Assigned to: {handleAssignName(task.assignedTo)}
        </div>
        <div className="card-actions">
          <button className="btn ">
            Status
            <div className="badge badge-secondary p-2">{task.status}</div>
          </button>

          <button
            className="btn btn-outline btn-primary"
            onClick={() => handleEdit(task._id, "my_modal_edit")}
          >
            <Brush className="w-5 h-5" />
          </button>
          <button
            className="btn btn-outline btn-error"
            onClick={() => handleDelete(task._id)}
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="card-body">
        <p className="text-base-content/95">Description: {task.description}</p>

        <p className="text-xs text-base-content/50 mt-4">
          Created: {formatMessageTime(task.createdAt)}
        </p>
      </div>

      <DeleteConfirmCard />
    </div>
  );
};

export default TaskCard;
