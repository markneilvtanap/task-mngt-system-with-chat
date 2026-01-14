import React from "react";

const CountsTaskCards = () => {
  return (
    <div className="flex px-10 pt-5">
      <div className="card bg-base-300 rounded-box grid h-20 flex-grow place-items-center">
        All Tasks Counts
      </div>
      <div className="divider divider-horizontal"></div>
      <div className="card bg-base-300 rounded-box grid h-20 flex-grow place-items-center">
        Self Tasks
      </div>
      <div className="divider divider-horizontal"></div>
      <div className="card bg-base-300 rounded-box grid h-20 flex-grow place-items-center">
        Assigned Task to Me
      </div>
      <div className="divider divider-horizontal"></div>
      <div className="card bg-base-300 rounded-box grid h-20 flex-grow place-items-center">
        Assigned Tasks to Others
      </div>
    </div>
  );
};

export default CountsTaskCards;
