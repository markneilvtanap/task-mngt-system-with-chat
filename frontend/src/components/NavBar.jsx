import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useTaskStore } from "../store/useTaskStore";
import { Menu } from "lucide-react";

const NavBar = () => {
  const { authUser, logout } = useAuthStore();

  const {
    controlModal,
    fetchSelfTasks,
    fetchAssignedMeTasks,
    fetchAssignedOthersfTasks,
    fetchAllTasks,
  } = useTaskStore();
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        {authUser ? (
          // <div className="dropdown">
          //   <div
          //     tabIndex={0}
          //     role="button"
          //     className="btn btn-ghost btn-circle"
          //   >
          //     <svg
          //       xmlns="http://www.w3.org/2000/svg"
          //       className="h-5 w-5"
          //       fill="none"
          //       viewBox="0 0 24 24"
          //       stroke="currentColor"
          //     >
          //       <path
          //         strokeLinecap="round"
          //         strokeLinejoin="round"
          //         strokeWidth="2"
          //         d="M4 6h16M4 12h16M4 18h7"
          //       />
          //     </svg>
          //   </div>
          //   <ul
          //     tabIndex={0}
          //     className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-3 shadow"
          //   >
          //     <li>
          //       <a className="p-3" onClick={controlModal}>
          //         Create Task
          //       </a>
          //     </li>
          //     <li>
          //       <a className="p-3" onClick={fetchAllTasks}>
          //         {" "}
          //         All Task
          //       </a>
          //     </li>

          //     <li>
          //       <a className="p-3" onClick={fetchSelfTasks}>
          //         Self Task
          //       </a>
          //     </li>
          //     <li>
          //       <a className="p-3" onClick={fetchAssignedMeTasks}>
          //         My Assigned Task
          //       </a>
          //     </li>
          //     <li>
          //       <a className="p-3" onClick={fetchAssignedOthersfTasks}>
          //         Assigned Task To Others
          //       </a>
          //     </li>
          //   </ul>
          // </div>

          <details className="dropdown">
            <summary className="btn m-1">
              <Menu />
            </summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              <li>
                <a className="p-3" onClick={controlModal}>
                  Create Task
                </a>
              </li>
              <li>
                <a className="p-3" onClick={fetchAllTasks}>
                  {" "}
                  All Task
                </a>
              </li>

              <li>
                <a className="p-3" onClick={fetchSelfTasks}>
                  Self Task
                </a>
              </li>
              <li>
                <a className="p-3" onClick={fetchAssignedMeTasks}>
                  My Assigned Task
                </a>
              </li>
              <li>
                <a className="p-3" onClick={fetchAssignedOthersfTasks}>
                  Assigned Task To Others
                </a>
              </li>
            </ul>
          </details>
        ) : null}
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">Planova</a>
      </div>
      <div className="navbar-end gap-5 pr-3">
        {authUser ? (
          <>
            {" "}
            {/* search */}
            <label className="input input-bordered flex items-center gap-2">
              <input type="text" className="grow" placeholder="Search" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
            {/* user */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              </ul>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default NavBar;
