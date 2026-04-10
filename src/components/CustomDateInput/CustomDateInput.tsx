import React, { useRef } from "react";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { getCorrectDate } from "../../helpers/dateHelpers";

interface CustomDateInputProps {
  startDate: string;
  setDate: (date: Date) => void;
  customClassNames?: string;
}

export const CustomDateInput = ({ startDate, setDate, customClassNames }: CustomDateInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick = () => {
    inputRef.current?.showPicker();
  };

  return (
    <div
      className={`${customClassNames ?? ""} flex cursor-pointer items-center rounded-sm bg-gray-850 px-2 text-xs text-gray-200 outline outline-1 outline-offset-0 outline-gray-700`}
      onClick={handleContainerClick}
    >
      <input
        ref={inputRef}
        className="rounded-xs block h-8 w-full bg-gray-850 pl-2 text-sm outline outline-1 outline-offset-0 outline-gray-700"
        type="date"
        name="startDate"
        id="start_date"
        aria-label="Paycheck start date"
        value={startDate}
        onChange={(e) => setDate(getCorrectDate(e.target.value))}
      />
      <CalendarDaysIcon className="h-6 w-6 text-gray-700 hover:text-gray-200" />
    </div>
  );
};
