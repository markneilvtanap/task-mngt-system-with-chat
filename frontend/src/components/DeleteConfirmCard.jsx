import { useEffect } from "react";
import { useTaskStore } from "../store/useTaskStore";

const DeleteConfirmCard = () => {
  const { deleteTask, deleteTaskID } = useTaskStore();
  const { fetchAllTaskCounts } = useTaskStore();

  // useEffect(() => {
  //   fetchAllTaskCounts();
  // }, [fetchAllTaskCounts]);

  const handleDelete = () => {
    deleteTask(deleteTaskID);
  };

  return (
    <>
      <dialog id="my_modal_delete" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-xl">
            Are you sure you want to delete this task?
          </h3>
          {/* <p className="py-4">
            click yes if you want to delete this task else click close button.
          </p> */}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-error mr-4 " onClick={handleDelete}>
                Yes
              </button>
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DeleteConfirmCard;
