import React, { useEffect, useState } from "react";
import { PaycheckCalendarDate } from "../PaycheckCalendarDate";
import { PaycheckCalendarHeader } from "../PaycheckCalendarHeader";
import { getPayweekDays } from "../../helpers/payweekHelpers";
import { convertSinglesToDoubles } from "../../helpers/dateHelpers";

export const PaycheckCalendar = ({
  date,
  calendarRows,
  selectedDate,
  setSelectedDate,
}) => {
  const paycheckWeekdays = getPayweekDays(date);
  const [selection, setSelection] = useState(false);

  return (
    <table className="w-full">
      <thead>
        <tr className="bg-gray-900 text-gray-600">
          {paycheckWeekdays.map((weekday) => (
            <PaycheckCalendarHeader
              key={weekday.id}
              weekday={weekday.weekday}
            />
          ))}
        </tr>
      </thead>
      <tbody>
        {calendarRows && (
          <tr className="bg-gray-900">
            {calendarRows[0].map((paydate) => (
              <PaycheckCalendarDate
                key={paydate}
                date={paydate}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            ))}
          </tr>
        )}

        {calendarRows && (
          <tr className="bg-gray-900">
            {calendarRows[1].map((paydate) => (
              <PaycheckCalendarDate
                key={paydate}
                date={paydate}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selection={selection}
                setSelection={setSelection}
              />
            ))}
          </tr>
        )}
      </tbody>
    </table>
  );
};
