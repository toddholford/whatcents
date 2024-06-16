import React from "react";

export const CalculationBox = ({ amount }) => {
  return <p className="pb-6 text-2xl">${amount.toFixed(2)}</p>;
};
