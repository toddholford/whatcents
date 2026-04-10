import React from "react";
import { PaycheckCalendarDate } from "../PaycheckCalendarDate";
import { PaycheckCalendarHeader } from "../PaycheckCalendarHeader";
import { getPayweekDays } from "../../helpers/payweekHelpers";

interface PaycheckCalendarProps {
  date: Date;
  calendarRows: string[][] | null;
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
}

export const PaycheckCalendar = ({
  date,
  calendarRows,
  selectedDate,
  setSelectedDate,
}: PaycheckCalendarProps) => {
  const paycheckWeekdays = getPayweekDays(date);

  return (
    <table className="w-full">
      <thead>
        <tr className="bg-gray-900 text-gray-600">
          {paycheckWeekdays.map((weekday) => (
            <PaycheckCalendarHeader key={weekday.id} weekday={weekday.weekday} />
          ))}
        </tr>
      </thead>
      <tbody>
        {calendarRows?.[0] && (
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
        {(calendarRows?.[1]?.length ?? 0) > 0 && (
          <tr className="bg-gray-900">
            {calendarRows![1].map((paydate) => (
              <PaycheckCalendarDate
                key={paydate}
                date={paydate}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            ))}
          </tr>
        )}
      </tbody>
    </table>
  );
};
