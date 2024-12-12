// import React, { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   ArrowLeftStartOnRectangleIcon,
//   RectangleGroupIcon,
//   TableCellsIcon,
// } from "@heroicons/react/24/outline";
// import supabaseClient from "../../config/supabaseClient";
// import { Tooltip } from "react-tooltip";
//
// export const Navbar = () => {
//   const [user, setUser] = useState({});
//   const navigate = useNavigate();
//   const location = useLocation();
//
//   useEffect(() => {
//     async function getUserData() {
//       const { data } = await supabaseClient.auth.getUser();
//       if (data?.user) {
//         setUser(data.user);
//       }
//     }
//     getUserData();
//   }, []);
//
//   async function signOutUser() {
//     const { error } = await supabaseClient.auth.signOut();
//     if (!error) {
//       navigate("/");
//     }
//   }
//
//   const getNavLinkClass = (path) => {
//     return location.pathname === path
//       ? "bg-gray-800 text-gray-200 rounded-sm outline outline-1 outline-offset-0 outline-gray-700"
//       : "text-gray-500 hover:cursor-pointer hover:rounded-sm hover:bg-gray-800 hover:text-gray-200 hover:outline hover:outline-1 hover:outline-offset-0 hover:outline-gray-700";
//   };
//
//   return (
//     <article
//       id="navbar"
//       className="col-span-1 row-span-full grid grid-rows-24 bg-gray-950 outline outline-1 outline-offset-0 outline-gray-700"
//     >
//       <div
//         data-tooltip-id="dashboard-tooltip"
//         data-tooltip-content="Dashboard"
//         className={`col-start-1 row-start-2 mx-2 content-center ${getNavLinkClass("/dashboard")}`}
//       >
//         <Link to="/dashboard">
//           <div className="flex flex-row justify-center">
//             <RectangleGroupIcon className="h-6 w-6" />
//           </div>
//         </Link>
//       </div>
//       <Tooltip
//         id="dashboard-tooltip"
//         delayShow={800}
//         style={{ backgroundColor: "rgb(31 41 55)", color: "#FFFFFF" }}
//         className="bg-gray-800 outline outline-1 outline-offset-0 outline-gray-700"
//       />
//
//       <div
//         data-tooltip-id="sign-out-tooltip"
//         data-tooltip-content="Sign Out"
//         className="col-start-1 row-start-19 mx-2 content-center text-center align-middle text-gray-500 hover:cursor-pointer hover:rounded-sm hover:bg-gray-800 hover:text-gray-200 hover:outline hover:outline-1 hover:outline-offset-0 hover:outline-gray-700"
//       >
//         <button onClick={() => signOutUser()}>
//           <div
//             id="sign-out-button"
//             className="flex flex-row justify-center pt-2"
//           >
//             <ArrowLeftStartOnRectangleIcon className="h-6 w-6" />
//           </div>
//         </button>
//       </div>
//       <Tooltip
//         id="sign-out-tooltip"
//         delayShow={800}
//         style={{ backgroundColor: "rgb(31 41 55)", color: "#FFFFFF" }}
//         className="outline outline-1 outline-offset-0 outline-gray-700"
//       />
//     </article>
//   );
// };

import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeftOnRectangleIcon, CalendarIcon,
  RectangleGroupIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import supabaseClient from "../../config/supabaseClient";
import { Tooltip } from "react-tooltip";

export const Navbar = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function getUserData() {
      const { data } = await supabaseClient.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      }
    }
    getUserData();
  }, []);

  async function signOutUser() {
    const { error } = await supabaseClient.auth.signOut();
    if (!error) {
      navigate("/");
    }
  }

  const getNavLinkClass = (path) => {
    return location.pathname === path
        ? "bg-gray-800 text-gray-200 rounded-sm outline outline-1 outline-offset-0 outline-gray-700"
        : "text-gray-500 hover:cursor-pointer hover:rounded-sm hover:bg-gray-800 hover:text-gray-200 hover:outline hover:outline-1 hover:outline-offset-0 hover:outline-gray-700";
  };

  function toggleCalendarColumn() {

  }

  function toggleMonthlyExpensesColumn() {

  }

  return (
      <div className="flex">
        {/* Sidebar for Desktop */}
        <nav className="hidden md:flex flex-col md:fixed md:h-screen md:w-14 bg-gray-950 text-white p-4">
          <div
              data-tooltip-id="dashboard-tooltip"
              data-tooltip-content="Dashboard"
              className={`mb-2 ${getNavLinkClass("/dashboard")}`}
          >
            <Link to="/dashboard">
              <div className="flex flex-row items-center">
                <RectangleGroupIcon className="h-6 w-6 mr-2" />
              </div>
            </Link>
          </div>
          <Tooltip
              id="dashboard-tooltip"
              delayShow={800}
              style={{ backgroundColor: "rgb(31 41 55)", color: "#FFFFFF" }}
              className="bg-gray-800 outline outline-1 outline-offset-0 outline-gray-700"
          />
          <div
              data-tooltip-id="sign-out-tooltip"
              data-tooltip-content="Sign Out"
              className="text-gray-500 hover:cursor-pointer hover:rounded-sm hover:bg-gray-800 hover:text-gray-200 hover:outline hover:outline-1 hover:outline-offset-0 hover:outline-gray-700"
          >
            <button onClick={() => signOutUser()}>
              <div className="flex flex-row items-center">
                <ArrowLeftOnRectangleIcon className="h-6 w-6 mr-2" />
              </div>
            </button>
          </div>
          <Tooltip
              id="sign-out-tooltip"
              delayShow={800}
              style={{ backgroundColor: "rgb(31 41 55)", color: "#FFFFFF" }}
              className="outline outline-1 outline-offset-0 outline-gray-700"
          />
        </nav>

        {/* Bottom Navbar for Mobile */}
        <nav className="fixed bottom-0 left-0 w-full bg-gray-950 text-white p-4 flex justify-around md:hidden">
          <Link
              to="/dashboard"
              className={`text-center ${getNavLinkClass("/dashboard")}`}
          >
            <RectangleGroupIcon className="h-6 w-6 mx-auto" />
          </Link>
          <button
              onClick={() => toggleCalendarColumn()}
              className="text-center text-gray-500 hover:cursor-pointer hover:rounded-sm hover:bg-gray-800 hover:text-gray-200 hover:outline hover:outline-1 hover:outline-offset-0 hover:outline-gray-700"
          >
            <CalendarIcon className="h-6 w-6 mx-auto" />
          </button>
          <button
              onClick={() => toggleMonthlyExpensesColumn()}
              className="text-center text-gray-500 hover:cursor-pointer hover:rounded-sm hover:bg-gray-800 hover:text-gray-200 hover:outline hover:outline-1 hover:outline-offset-0 hover:outline-gray-700"
          >
            <TableCellsIcon className="h-6 w-6 mx-auto" />
          </button>
          <button
              onClick={() => signOutUser()}
              className="text-center text-gray-500 hover:cursor-pointer hover:rounded-sm hover:bg-gray-800 hover:text-gray-200 hover:outline hover:outline-1 hover:outline-offset-0 hover:outline-gray-700"
          >
            <ArrowLeftOnRectangleIcon className="h-6 w-6 mx-auto" />
          </button>
        </nav>
      </div>
  );
};



