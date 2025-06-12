import React from 'react';
import {Link} from "react-router-dom";
import {Tooltip} from "react-tooltip";

export const NavbarItem = ({isActive, itemName, navIcon, isLink, buttonClickAction, showTooltip}) => {

    const getNavLinkClass = () => {
        if (isActive) {
            return "border border-t-2 border-b-0 border-x-0 border-emerald-500 flex justify-center text-center p-2 cursor-pointer rounded-sm bg-gray-800 text-gray-200 outline outline-1 outline-offset-0 outline-gray-700 hover:cursor-pointer hover:rounded-sm hover:bg-gray-800 hover:text-gray-200 hover:outline hover:outline-1 hover:outline-offset-0 hover:outline-gray-700";
        }

        return "flex flex-row justify-center text-gray-500 hover:cursor-pointer hover:rounded-sm hover:bg-gray-800 hover:text-gray-200 hover:outline hover:outline-1 hover:outline-offset-0 hover:outline-gray-700";
    };

    return (
        <>
            <div
                data-tooltip-id={itemName.toLowerCase()+"-tooltip"}
                data-tooltip-content={itemName}
                className={`${getNavLinkClass("/"+itemName.toLowerCase())}`}
            >
                {isLink ?
                <Link to={"/"+itemName.toLowerCase()}>
                    <div className="flex flex-row justify-center">
                        {navIcon}
                    </div>
                </Link> :
                <button onClick={() => {buttonClickAction()}}>
                    <div>
                        {navIcon}
                    </div>
                </button>
                }
            </div>
            {showTooltip &&
            <Tooltip
                id={itemName.toLowerCase()+"-tooltip"}
                delayShow={800}
                style={{ backgroundColor: "rgb(31 41 55)", color: "#FFFFFF" }}
                className="bg-gray-800 outline outline-1 outline-offset-0 outline-gray-700"
            />
            }
        </>
    );
};