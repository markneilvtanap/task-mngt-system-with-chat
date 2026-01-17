import { useEffect, useState } from "react";
import { useTaskStore } from "../store/useTaskStore";
import { useAuthStore } from "../store/useAuthStore";

const EditTask = () => {
  const { editTask, isEditingTask, editTaskID, tasks } = useTaskStore();

  const { allUsers } = useAuthStore();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    assignedTo: "me",
  });

  useEffect(() => {
    if (!editTaskID || !tasks?.length) return;

    const taskToEdit = tasks.find((t) => t._id === editTaskID);
    if (!taskToEdit) return;

    setFormData({
      title: taskToEdit.title || "",
      description: taskToEdit.description || "",
      status: taskToEdit.status || "pending",
      assignedTo: taskToEdit.assignedTo || "me",
    });
  }, [editTaskID, tasks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    editTask(editTaskID, formData);
    resetForm();
    document.getElementById("my_modal_edit").close();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      status: "pending",
      assignedTo: "me",
    });
  };

  return (
    <dialog id="my_modal_edit" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Edit Task</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            placeholder="Title"
            className="input input-bordered w-full"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            className="textarea textarea-bordered w-full"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <select
            name="status"
            className="select select-bordered w-full"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="transferred">Transferred</option>
            <option value="done">Done</option>
          </select>

          <select
            name="assignedTo"
            className="select select-bordered w-full"
            value={formData.assignedTo}
            onChange={handleChange}
          >
            <option value="me">Me</option>

            {Array.isArray(allUsers) &&
              allUsers.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.fullName}
                </option>
              ))}
          </select>

          <div className="modal-action">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isEditingTask}
            >
              {isEditingTask ? "Editing..." : "Edit"}
            </button>

            <button
              type="button"
              className="btn"
              onClick={() => document.getElementById("my_modal_edit").close()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default EditTask;
