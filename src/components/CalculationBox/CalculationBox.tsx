import React from "react";

interface CalculationBoxProps {
  amount: number;
  title?: string;
  customClasses?: string;
}

export const CalculationBox = ({ amount, title, customClasses }: CalculationBoxProps) => {
  return (
    <div>
      {title && <p className="text-sm text-gray-400">{title}</p>}
      <p className={`pb-6 text-2xl ${customClasses ?? ""}`}>${amount.toFixed(2)}</p>
    </div>
  );
};
