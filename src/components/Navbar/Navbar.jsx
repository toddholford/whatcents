import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeftStartOnRectangleIcon,
  CalendarIcon,
  RectangleGroupIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import supabaseClient from "../../config/supabaseClient";
import {NavbarItem} from "../NavbarItem";

export const Navbar = ({formColumn, setFormColumn, calendarColumn, setCalendarColumn, monthlyExpensesColumn, setMonthlyExpensesColumn}) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

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

  function toggleFormColumn() {
    if (!formColumn) {
      setFormColumn(!formColumn);
      setCalendarColumn(false);
      setMonthlyExpensesColumn(false);
    }
  }

  function toggleCalendarColumn() {
    if (!calendarColumn) {
      setCalendarColumn(!calendarColumn);
      setFormColumn(false);
      setMonthlyExpensesColumn(false);
    }
  }

  function toggleMonthlyExpensesColumn() {
    if(!monthlyExpensesColumn){
      setMonthlyExpensesColumn(!monthlyExpensesColumn);
      setFormColumn(false);
      setCalendarColumn(false);
    }
  }

  return (
      <div className="flex">
        {/* Sidebar for Desktop */}
        <nav className="hidden lg:flex flex-col lg:fixed lg:h-screen lg:w-14 bg-gray-950 text-white p-2 gap-2 outline outline-1 outline-offset-0 outline-gray-700">
          <NavbarItem isActive={formColumn} itemName="Dashboard" navIcon={<RectangleGroupIcon className="h-6 w-6" />} isLink={true} showTooltip={true}/>
          <NavbarItem itemName="Sign Out" navIcon={<ArrowLeftStartOnRectangleIcon className="h-6 w-6 my-2" />} buttonClickAction={() => signOutUser()} showTooltip={true}/>
        </nav>

        {/* Bottom Navbar for Mobile */}
        <nav className="z-10 fixed bottom-0 left-0 w-full bg-gray-950 text-white p-4 flex justify-around lg:hidden">
          <NavbarItem isActive={formColumn} itemName="Dashboard" navIcon={<RectangleGroupIcon className="h-6 w-6 mx-auto" />} buttonClickAction={() => toggleFormColumn()}/>
          <NavbarItem isActive={calendarColumn} itemName="Calendar" navIcon={<CalendarIcon className="h-6 w-6 mx-auto" />} buttonClickAction={() => toggleCalendarColumn()}/>
          <NavbarItem isActive={monthlyExpensesColumn} itemName="Expenses" navIcon={<TableCellsIcon className="h-6 w-6 mx-auto" />} buttonClickAction={() => toggleMonthlyExpensesColumn()}/>
          <NavbarItem itemName="Sign Out" navIcon={<ArrowLeftStartOnRectangleIcon className="h-6 w-6 mx-auto" />} buttonClickAction={() => signOutUser()}/>
        </nav>
      </div>
  );
};



