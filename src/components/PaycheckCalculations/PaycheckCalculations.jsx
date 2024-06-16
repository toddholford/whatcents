import React from "react";
import { CalculationBox } from "../CalculationBox";

export const PaycheckCalculations = ({ paycheckCalculations, startDate }) => {
  return (
    <>
      {paycheckCalculations.map((calculation) => (
        <div key={calculation.id}>
          <p className="z-10 -mb-2.5 mt-2 h-fit rounded-l rounded-r bg-gray-900 p-2 text-lg font-bold">
            {calculation.start_date === startDate
              ? "Current"
              : calculation.start_date}
          </p>
          <div className="grid grid-cols-3 p-2 text-center">
            <CalculationBox
              title={"Income"}
              amount={calculation.income_amount}
              customClasses="underline decoration-sky-500"
            />
            <CalculationBox
              title={"Expense"}
              amount={calculation.expense_amount}
              customClasses="underline decoration-pink-500"
            />
            <CalculationBox
              title={"Remainder"}
              amount={calculation.income_amount - calculation.expense_amount}
              customClasses="underline decoration-lime-500"
            />
          </div>
        </div>
      ))}
    </>
  );
};
