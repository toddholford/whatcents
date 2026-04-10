import React from "react";

interface PaycheckCalendarHeaderProps {
  weekday: string;
}

export const PaycheckCalendarHeader = ({ weekday }: PaycheckCalendarHeaderProps) => {
  return (
    <th scope="col">
      <div className="w-full flex justify-center">
        <p className="text-base font-medium text-center">{weekday}</p>
      </div>
    </th>
  );
};
