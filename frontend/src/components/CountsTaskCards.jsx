import { useEffect } from "react";
import { useTaskStore } from "../store/useTaskStore";

const CountsTaskCards = () => {
  // const { fetchAllTaskCounts } = useTaskStore();

  // useEffect(() => {
  //   fetchAllTaskCounts();
  // }, [fetchAllTaskCounts]);
  const {
    allTasksCount,
    assignedTaskMeCount,
    selfTaskCount,
    assignedToOthersCount,
  } = useTaskStore();

  return (
    <div className="flex px-10 pt-5">
      <div className="card bg-base-300 rounded-box grid h-20 flex-grow place-items-center">
        All Tasks
        <p> {allTasksCount}</p>
      </div>
      <div className="divider divider-horizontal"></div>
      <div className="card bg-base-300 rounded-box grid h-20 flex-grow place-items-center">
        Self Tasks
        <p> {selfTaskCount}</p>
      </div>
      <div className="divider divider-horizontal"></div>
      <div className="card bg-base-300 rounded-box grid h-20 flex-grow place-items-center">
        Assigned Task to Me
        <p> {assignedTaskMeCount}</p>
      </div>
      <div className="divider divider-horizontal"></div>
      <div className="card bg-base-300 rounded-box grid h-20 flex-grow place-items-center">
        Assigned Tasks to Others
        <p> {assignedToOthersCount}</p>
      </div>
    </div>
  );
};

export default CountsTaskCards;
