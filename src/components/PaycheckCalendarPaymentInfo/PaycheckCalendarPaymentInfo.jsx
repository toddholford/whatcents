import React from "react";
import { addCurrencyZeroes } from "../../helpers/numberFormatHelper";
import { AddDueDateSuffix } from "../../helpers/dateHelpers";

export const PaycheckCalendarPaymentInfo = ({ weekday, amount, expense }) => {
  const customCss =
    weekday !== "" ? "border-b py-1.5 border-gray-700 border-solid" : "";

  return (
    <div className={customCss}>
      <a
        tabIndex="0"
        className="mt-2 text-lg font-medium leading-5 text-gray-200 focus:outline-none"
      >
        {addCurrencyZeroes(amount)}
      </a>
      <p className="pt-0.5 text-sm leading-none text-gray-400">{expense}</p>
    </div>
  );
};
