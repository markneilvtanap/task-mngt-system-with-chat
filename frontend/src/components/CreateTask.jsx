import { useEffect, useState } from "react";
import { useTaskStore } from "../store/useTaskStore";
import { useAuthStore } from "../store/useAuthStore";

const CreateTask = () => {
  const { createTask, isCreatingTask } = useTaskStore();

  const { getAllUsers, AllUsers } = useAuthStore();

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    assignedTo: "me",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTask(formData);
  };

  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Create Task</h3>

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

            {Array.isArray(AllUsers) &&
              AllUsers.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.fullName}
                </option>
              ))}
          </select>

          <div className="modal-action">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isCreatingTask}
            >
              {isCreatingTask ? "Creating..." : "Create"}
            </button>

            <button
              type="button"
              className="btn"
              onClick={() => document.getElementById("my_modal_5").close()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default CreateTask;
