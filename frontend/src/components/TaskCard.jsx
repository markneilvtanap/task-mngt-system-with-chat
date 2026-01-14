import { Trash2, Brush } from "lucide-react";

const TaskCard = ({ task }) => {
  return (
    <div className="card bg-base-100  shadow-xl mx-5 my-3 ">
      <div className="card-header flex justify-between p-5">
        <div className="card-title">{task.title}</div>

        <div className="card-subtitle">Assigned to: {task.assignedTo}</div>
        <div className="card-actions">
          <button className="btn ">
            Status
            <div className="badge badge-secondary p-2">{task.status}</div>
          </button>

          <button className="btn btn-outline btn-primary">
            <Brush className="w-5 h-5" />
          </button>
          <button className="btn btn-outline btn-error">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="card-body">
        <p className="text-base-content/70">{task.description}</p>

        <p className="text-xs text-base-content/50 mt-4">
          Created: {new Date(task.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
