import React from "react";

interface CalendarTableRowProps {
  rowType: string;
}

export const CalendarTableRow = ({ rowType }: CalendarTableRowProps) => {
  return (
    <tr className="divide-x divide-solid divide-gray-400 bg-gray-900">
      <th>
        <div className="flex w-full justify-center">
          <p className="text-center text-base font-medium">{rowType}</p>
        </div>
      </th>
    </tr>
  );
};
