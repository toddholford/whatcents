import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeftStartOnRectangleIcon,
  CalendarIcon,
  RectangleGroupIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import supabaseClient from "../../config/supabaseClient";
import { NavbarItem } from "../NavbarItem";
import { useUIStore } from "../../store/useUIStore";

export const Navbar = () => {
  const navigate = useNavigate();
  const {
    showFormColumn,
    showCalendarColumn,
    showMonthlyExpensesColumn,
    setShowFormColumn,
    setShowCalendarColumn,
    setShowMonthlyExpensesColumn,
  } = useUIStore();

  async function signOutUser() {
    const { error } = await supabaseClient.auth.signOut();
    if (!error) navigate("/");
  }

  function toggleFormColumn() {
    if (!showFormColumn) {
      setShowFormColumn(true);
      setShowCalendarColumn(false);
      setShowMonthlyExpensesColumn(false);
    }
  }

  function toggleCalendarColumn() {
    if (!showCalendarColumn) {
      setShowCalendarColumn(true);
      setShowFormColumn(false);
      setShowMonthlyExpensesColumn(false);
    }
  }

  function toggleMonthlyExpensesColumn() {
    if (!showMonthlyExpensesColumn) {
      setShowMonthlyExpensesColumn(true);
      setShowFormColumn(false);
      setShowCalendarColumn(false);
    }
  }

  return (
    <div className="flex">
      {/* Sidebar for Desktop */}
      <nav
        aria-label="Main navigation"
        className="hidden lg:flex flex-col lg:fixed lg:h-screen lg:w-14 bg-gray-950 text-white p-2 gap-2 outline outline-1 outline-offset-0 outline-gray-700"
      >
        <NavbarItem
          isActive={showFormColumn}
          itemName="Dashboard"
          navIcon={<RectangleGroupIcon className="h-6 w-6" />}
          isLink
          showTooltip
        />
        <NavbarItem
          itemName="Sign Out"
          navIcon={<ArrowLeftStartOnRectangleIcon className="h-6 w-6 my-2" />}
          buttonClickAction={signOutUser}
          showTooltip
          ariaLabel="Sign out"
        />
      </nav>

      {/* Bottom Navbar for Mobile */}
      <nav
        aria-label="Mobile navigation"
        className="z-10 fixed bottom-0 left-0 w-full bg-gray-950 text-white p-4 flex justify-around lg:hidden"
      >
        <NavbarItem
          isActive={showFormColumn}
          itemName="Dashboard"
          navIcon={<RectangleGroupIcon className="h-6 w-6 mx-auto" />}
          buttonClickAction={toggleFormColumn}
        />
        <NavbarItem
          isActive={showCalendarColumn}
          itemName="Calendar"
          navIcon={<CalendarIcon className="h-6 w-6 mx-auto" />}
          buttonClickAction={toggleCalendarColumn}
        />
        <NavbarItem
          isActive={showMonthlyExpensesColumn}
          itemName="Expenses"
          navIcon={<TableCellsIcon className="h-6 w-6 mx-auto" />}
          buttonClickAction={toggleMonthlyExpensesColumn}
        />
        <NavbarItem
          itemName="Sign Out"
          navIcon={<ArrowLeftStartOnRectangleIcon className="h-6 w-6 mx-auto" />}
          buttonClickAction={signOutUser}
          ariaLabel="Sign out"
        />
      </nav>
    </div>
  );
};
