import React from 'react';

export const PaycheckCalendarHeader = ({weekday}) => {
    return (
        <th>
            <div className="w-full flex justify-center">
                <p className="text-base font-medium text-center">{weekday}</p>
            </div>
        </th>
    );
};