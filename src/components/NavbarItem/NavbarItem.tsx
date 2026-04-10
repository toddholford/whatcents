import React from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

interface NavbarItemProps {
  isActive?: boolean;
  itemName: string;
  navIcon: React.ReactNode;
  isLink?: boolean;
  buttonClickAction?: () => void;
  showTooltip?: boolean;
  ariaLabel?: string;
}

export const NavbarItem = ({
  isActive,
  itemName,
  navIcon,
  isLink,
  buttonClickAction,
  showTooltip,
  ariaLabel,
}: NavbarItemProps) => {
  const baseClass = isActive
    ? "border border-t-2 border-b-0 border-x-0 border-emerald-500 flex justify-center text-center p-2 cursor-pointer rounded-sm bg-gray-800 text-gray-200 outline outline-1 outline-offset-0 outline-gray-700 hover:cursor-pointer hover:rounded-sm hover:bg-gray-800 hover:text-gray-200 hover:outline hover:outline-1 hover:outline-offset-0 hover:outline-gray-700"
    : "flex flex-row justify-center text-gray-500 hover:cursor-pointer hover:rounded-sm hover:bg-gray-800 hover:text-gray-200 hover:outline hover:outline-1 hover:outline-offset-0 hover:outline-gray-700";

  const tooltipId = `${itemName.toLowerCase()}-tooltip`;

  return (
    <>
      <div
        data-tooltip-id={showTooltip ? tooltipId : undefined}
        data-tooltip-content={itemName}
        className={baseClass}
      >
        {isLink ? (
          <Link to={`/${itemName.toLowerCase()}`} aria-label={ariaLabel ?? itemName}>
            <div className="flex flex-row justify-center">{navIcon}</div>
          </Link>
        ) : (
          <button
            onClick={buttonClickAction}
            aria-label={ariaLabel ?? itemName}
            type="button"
          >
            {navIcon}
          </button>
        )}
      </div>

      {showTooltip && (
        <Tooltip
          id={tooltipId}
          delayShow={800}
          style={{ backgroundColor: "rgb(31 41 55)", color: "#FFFFFF" }}
          className="bg-gray-800 outline outline-1 outline-offset-0 outline-gray-700"
        />
      )}
    </>
  );
};
