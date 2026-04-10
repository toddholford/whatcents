import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import type { PayFrequency } from "../../types";

interface CustomDropdownProps {
  options: PayFrequency[];
  selected: string | null;
  onSelect: (value: string) => void;
  placeholder?: string;
  customClassNames?: string;
}

export const CustomDropdown = ({
  options,
  selected,
  onSelect,
  placeholder,
  customClassNames,
}: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className={`relative text-sm ${customClassNames ?? ""}`}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
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
        <ul
          role="listbox"
          aria-label="Pay frequency options"
          className="absolute z-10 mt-1 w-full rounded-sm bg-gray-850 shadow-lg outline outline-1 outline-offset-0 outline-gray-700"
        >
          {options.map((option) => (
            <li
              key={option.id}
              role="option"
              aria-selected={selected === option.value}
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
