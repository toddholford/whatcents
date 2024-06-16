import React from "react";

export const CalendarTableRow = ({ rowType }) => {
  return (
    <tr className="divide-x divide-solid divide-gray-400 bg-gray-900">
      {/*Todo: Write if check for rowType=header to show either <PaycheckCalendarHeader/>(<th> tag) or <PaycheckCalendarDate/>(<td> tag)*/}

      <th>
        <div className="flex w-full justify-center">
          <p className="text-center text-base font-medium">{rowType}</p>
        </div>
      </th>
    </tr>
  );
};
