import React, { useEffect, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import supabase from "../../config/supabaseClient";

export const CustomNumberInput = ({
  id,
  inputValue,
  setInputValue,
  numberType,
  adjustBy,
  placeholder,
  customClassNames,
}) => {
  const adjustByValue = (adjustBy, numberType) => {
    let adjustValue = 1;

    if (!adjustBy) {
      return adjustValue;
    }
    switch (numberType) {
      case "number":
        adjustValue = parseInt(adjustBy);
        break;
      case "decimal":
        adjustValue = parseFloat(adjustBy);
        break;
      default:
        adjustValue = parseInt(adjustBy);
        break;
    }
    return adjustValue;
  };

  return (
    <div id={id} className={"flex flex-row text-xs " + customClassNames}>
      <input
        type="number"
        inputMode="decimal"
        min="0.01"
        step="0.01"
        placeholder={placeholder}
        className="bg-gray-850 block h-8 w-5/6 rounded-l-sm pl-2 outline outline-1 outline-offset-0 outline-gray-700"
        onChange={(e) => {
          switch (numberType) {
            case "number":
              setInputValue(parseInt(e.target.value));
              break;
            case "decimal":
              setInputValue(parseFloat(e.target.value));
              break;
            default:
              setInputValue(parseInt(e.target.value));
              break;
          }
        }}
        value={inputValue}
      />
      <div className="flex w-1/6 flex-col">
        <button
          id="numUp"
          type="button"
          className="bg-gray-850 flex h-4 content-center items-center rounded-tr-sm outline outline-1 outline-offset-0 outline-gray-700 hover:bg-gray-800 hover:text-white hover:outline hover:outline-1 hover:outline-offset-0 hover:outline-gray-700 active:bg-gray-700"
          onMouseDown={() => {
            setInputValue(inputValue + adjustByValue(adjustBy, numberType));
          }}
        >
          <ChevronUpIcon className="scale-25"></ChevronUpIcon>
        </button>

        <button
          id="numDown"
          type="button"
          className="bg-gray-850 flex h-4 content-center items-center rounded-br-sm outline outline-1 outline-offset-0 outline-gray-700 hover:bg-gray-800 hover:text-white hover:outline hover:outline-1 hover:outline-offset-0 hover:outline-gray-700 active:bg-gray-700"
          onMouseDown={() => {
            if (inputValue !== 0) {
              setInputValue(inputValue - adjustByValue(adjustBy, numberType));
            }
          }}
        >
          <ChevronDownIcon className="scale-25"></ChevronDownIcon>
        </button>
      </div>
    </div>
  );
};
