import React, { useRef } from "react";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { getCorrectDate } from "../../helpers/dateHelpers";

export const CustomDateInput = ({ startDate, setDate, customClassNames }) => {
  const inputRef = useRef(null);

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.showPicker(); // Use showPicker to display the date picker
    }
  };

  return (
    <div
      className={
        customClassNames
          ? customClassNames +
            " flex cursor-pointer items-center rounded-sm bg-gray-850 px-2 text-xs text-gray-200 outline outline-1 outline-offset-0 outline-gray-700"
          : "flex cursor-pointer items-center rounded-sm bg-gray-850 px-2 text-xs text-gray-200 outline outline-1 outline-offset-0 outline-gray-700"
      }
      onClick={handleContainerClick}
    >
      <input
        ref={inputRef}
        className="rounded-xs block h-8 w-full bg-gray-850 pl-2 text-sm outline outline-1 outline-offset-0 outline-gray-700"
        type="date"
        name="startDate"
        id="start_date"
        value={startDate}
        onChange={(e) => {
          setDate(getCorrectDate(e.target.value));
        }}
      ></input>
      <CalendarDaysIcon className="h-6 w-6 text-gray-700 hover:text-gray-200" />
    </div>
  );
};
