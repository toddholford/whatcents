import React from "react";
import { addCurrencyZeroes } from "../../helpers/numberFormatHelper";
import { AddDueDateSuffix } from "../../helpers/dateHelpers";

interface PaycheckCalendarPaymentInfoProps {
  weekday: number | string;
  amount: number;
  expense: string;
}

export const PaycheckCalendarPaymentInfo = ({
  weekday,
  amount,
  expense,
}: PaycheckCalendarPaymentInfoProps) => {
  const customCss =
    weekday !== "" ? "border-b py-1.5 border-gray-700 border-solid" : "";

  return (
    <div className={customCss}>
      <p className="mt-2 text-lg font-medium leading-5 text-gray-200">
        {addCurrencyZeroes(amount)}
      </p>
      <p className="pt-0.5 text-sm leading-none text-gray-400">{expense}</p>
    </div>
  );
};
