import React from "react";
import { Bars2Icon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

type SortOrder = "ascending" | "descending" | "default";

interface SortButtonProps {
  column: string;
  sortOrder: SortOrder;
  onSort: (column: string) => void;
}

export const SortButton = ({ column, sortOrder, onSort }: SortButtonProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onSort(column);
  };

  const Icon =
    sortOrder === "ascending"
      ? ChevronUpIcon
      : sortOrder === "descending"
        ? ChevronDownIcon
        : Bars2Icon;

  return (
    <button
      onMouseDown={handleClick}
      aria-label={`Sort by ${column}`}
      className="ml-2 rounded-sm cursor-pointer text-gray-600 hover:text-white outline outline-1 outline-offset-0 outline-gray-700 hover:bg-gray-800 hover:outline-gray-600 active:bg-gray-700"
    >
      <Icon className="h-6 w-6 scale-75" />
    </button>
  );
};
