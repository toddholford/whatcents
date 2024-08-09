import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export const CustomDropdown = ({
  options,
  selected,
  onSelect,
  placeholder,
  customClassNames,
  optionCustomClassNames,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className={"relative text-sm " + customClassNames}>
      <button
        className="block h-8 w-full rounded-sm bg-gray-850 pl-2 outline outline-1 outline-offset-0 outline-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between">
          {selected !== null ? (
            <span>{selected}</span>
          ) : (
            <span className="pt-0.5 text-xs text-gray-400">{placeholder}</span>
          )}
          <ChevronDownIcon className="h-5 w-5 pr-2" />
        </div>
      </button>
      {isOpen && (
        <ul className="absolute mt-1 w-full rounded-sm bg-gray-850 shadow-lg outline outline-1 outline-offset-0 outline-gray-700">
          {options.map((option) => (
            <li
              key={option.id}
              className="cursor-pointer px-2 py-1 hover:bg-gray-800"
              onClick={() => handleSelect(option.value)}
            >
              {option.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
