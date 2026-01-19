import { useEffect, useState } from "react";
import { useTaskStore } from "../store/useTaskStore";
import { useAuthStore } from "../store/useAuthStore";

const CreateTask = () => {
  const { createTask, isCreatingTask, fetchAllTaskCounts } = useTaskStore();

  const { getAllUsers, allUsers, fetchMyID, myID } = useAuthStore();

  const getInitialFormData = (myID) => ({
    title: "",
    description: "",
    status: "pending",
    assignedTo: myID || "",
  });
  useEffect(() => {
    getAllUsers();
    fetchMyID();
  }, [getAllUsers, fetchMyID]);

  const [formData, setFormData] = useState(getInitialFormData(myID));

  // const [formData, setFormData] = useState({
  //   title: "",
  //   description: "",
  //   status: "pending",
  //   assignedTo: myID,
  // });

  useEffect(() => {
    if (myID && !formData.assignedTo) {
      setFormData((prev) => ({
        ...prev,
        assignedTo: myID,
      }));
    }
  }, [myID]);

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

    setFormData(getInitialFormData(myID));
    document.getElementById("my_modal_create").close();
  };

  return (
    <dialog id="my_modal_create" className="modal modal-bottom sm:modal-middle">
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
            <option value={myID}>Me</option>

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
              disabled={isCreatingTask}
            >
              {isCreatingTask ? "Creating..." : "Create"}
            </button>

            <button
              type="button"
              className="btn"
              onClick={() => document.getElementById("my_modal_create").close()}
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
