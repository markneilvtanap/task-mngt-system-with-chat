import React, { use, useEffect } from "react";
import { useTaskStore } from "../store/useTaskStore";
import CreateTask from "../components/CreateTask";

const HomePage = () => {
  const { fetchAllTasks, tasks, isTaskLoading } = useTaskStore();

  useEffect(() => {
    fetchAllTasks();
  }, [fetchAllTasks]);

  return (
    <div className="h-screen">
      <div className="flex w-full px-10 pt-5">
        <div className="card bg-base-300 rounded-box grid h-20 flex-grow place-items-center">
          All Task Counts
        </div>
        <div className="divider divider-horizontal"></div>
        <div className="card bg-base-300 rounded-box grid h-20 flex-grow place-items-center">
          content
        </div>
        <div className="divider divider-horizontal"></div>
        <div className="card bg-base-300 rounded-box grid h-20 flex-grow place-items-center">
          content
        </div>
        <div className="divider divider-horizontal"></div>
        <div className="card bg-base-300 rounded-box grid h-20 flex-grow place-items-center">
          content
        </div>
      </div>

      <CreateTask />
    </div>
  );
};

export default HomePage;
