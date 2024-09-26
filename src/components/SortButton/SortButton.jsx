import {Bars2Icon, ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/24/outline";

export const SortButton = ({ column, sortOrder, onSort }) => {
    const handleClick = (e) => {
        e.preventDefault();
        onSort(column);
    };

    let Icon;
    if (sortOrder === 'ascending') {
        Icon = ChevronUpIcon;
    } else if (sortOrder === 'descending') {
        Icon = ChevronDownIcon;
    } else {
        Icon = Bars2Icon;
    }

    return (
        <button
            onMouseDown={handleClick}
            className="ml-2 rounded-sm cursor-pointer text-gray-600 hover:text-white outline outline-1 outline-offset-0 outline-gray-700 hover:bg-gray-800 hover:outline-gray-600 active:bg-gray-700"
        >
            <Icon className="h-6 w-6 scale-75" />
        </button>
    );
};