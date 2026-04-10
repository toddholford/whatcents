import React, { memo } from "react";

interface PaycheckCalendarDateProps {
  date: string;
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
}

export const PaycheckCalendarDate = memo(({
  date,
  selectedDate,
  setSelectedDate,
}: PaycheckCalendarDateProps) => {
  const isSelected = selectedDate === date;

  const cellClass = isSelected
    ? "py-4 px-2 cursor-pointer flex w-full justify-center rounded-sm bg-gray-800 outline outline-offset-0 outline-1 outline-gray-600 active:bg-gray-700"
    : "py-4 px-2 cursor-pointer flex w-full justify-center hover:rounded-sm hover:bg-gray-800 hover:outline hover:outline-offset-0 hover:outline-1 hover:outline-gray-600 active:bg-gray-700";

  return (
    <td className="px-1 py-1">
      <button
        type="button"
        onMouseDown={() => setSelectedDate(date)}
        aria-label={`Select date ${date}`}
        aria-pressed={isSelected}
        className="w-full"
      >
        <div className={cellClass}>
          <p className="text-base text-gray-500 dark:text-gray-100">{date}</p>
        </div>
      </button>
    </td>
  );
});

PaycheckCalendarDate.displayName = "PaycheckCalendarDate";
