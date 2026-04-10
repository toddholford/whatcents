import React from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

interface CustomNumberInputProps {
  id?: string;
  inputValue?: number;
  setInputValue: (v: number) => void;
  numberType?: "number" | "decimal";
  adjustBy?: string;
  placeholder?: string;
  customClassNames?: string;
  defaultValue?: number;
}

function parseByType(value: string, numberType?: string): number {
  return numberType === "decimal" ? parseFloat(value) : parseInt(value, 10);
}

function adjustAmount(adjustBy: string | undefined, numberType?: string): number {
  if (!adjustBy) return 1;
  return numberType === "decimal" ? parseFloat(adjustBy) : parseInt(adjustBy, 10);
}

export const CustomNumberInput = ({
  id,
  inputValue,
  setInputValue,
  numberType,
  adjustBy,
  placeholder,
  customClassNames,
  defaultValue,
}: CustomNumberInputProps) => {
  const step = adjustAmount(adjustBy, numberType);

  return (
    <div id={id} className={`flex flex-row text-xs ${customClassNames ?? ""}`}>
      <input
        defaultValue={defaultValue}
        type="number"
        inputMode="decimal"
        min="0.01"
        step="0.01"
        placeholder={placeholder}
        aria-label={placeholder}
        className="block h-8 w-full rounded-l-sm bg-gray-850 pl-2 outline outline-1 outline-offset-0 outline-gray-700"
        onChange={(e) => setInputValue(parseByType(e.target.value, numberType))}
        value={inputValue != null && inputValue > 0 ? inputValue : defaultValue ?? ""}
      />
      <div className="flex w-10 flex-col">
        <button
          id="numUp"
          type="button"
          aria-label="Increase value"
          className="flex h-4 content-center items-center rounded-tr-sm bg-gray-850 outline outline-1 outline-offset-0 outline-gray-700 hover:bg-gray-800 hover:text-white active:bg-gray-700"
          onMouseDown={() => setInputValue((inputValue ?? 0) + step)}
        >
          <ChevronUpIcon className="scale-25" />
        </button>
        <button
          id="numDown"
          type="button"
          aria-label="Decrease value"
          className="flex h-4 content-center items-center rounded-br-sm bg-gray-850 outline outline-1 outline-offset-0 outline-gray-700 hover:bg-gray-800 hover:text-white active:bg-gray-700"
          onMouseDown={() => setInputValue((inputValue ?? 0) - step)}
        >
          <ChevronDownIcon className="scale-25" />
        </button>
      </div>
    </div>
  );
};
