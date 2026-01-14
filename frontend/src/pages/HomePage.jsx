import React, { use, useEffect } from "react";
import { useTaskStore } from "../store/useTaskStore";
import CreateTask from "../components/CreateTask";
import TaskCard from "../components/TaskCard";
import CountsTaskCards from "../components/CountsTaskCards";

const HomePage = () => {
  const { fetchAllTasks, tasks, isTaskLoading } = useTaskStore();

  useEffect(() => {
    fetchAllTasks();
  }, []);

  return (
    <div className="">
      <CountsTaskCards />

      {isTaskLoading ? (
        <div className="flex justify-center items-center h-48">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      ) : (
        <div className="max-h-[550px] overflow-y-auto space-y-4 pr-2 mt-5">
          {Array.isArray(tasks) && tasks.length > 0 ? (
            tasks.map((task) => <TaskCard key={task._id} task={task} />)
          ) : (
            <p className="text-center mt-10">No tasks available.</p>
          )}
        </div>
      )}

      <CreateTask />
    </div>
  );
};

export default HomePage;
