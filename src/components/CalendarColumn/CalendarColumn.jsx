import React from 'react';
import {PaycheckCalendar} from "../PaycheckCalendar";
import {getSelectedDateExpenseTotal} from "../../helpers/payweekHelpers";
import {AddDueDateSuffix} from "../../helpers/dateHelpers";
import {PaycheckCalendarPaymentInfo} from "../PaycheckCalendarPaymentInfo";

export const CalendarColumn = () => {

    return (<></>
        // <div
        //     id="center"
        //     className="col-span-4 row-span-full grid grid-flow-row grid-rows-24 bg-gray-900 outline outline-1 outline-offset-0 outline-gray-700"
        // >
        //     <div
        //         id="remaining_expenses_total"
        //         className="col-span-1 row-span-1 flex flex-row content-center items-center justify-between bg-gray-900 px-2 text-gray-400 outline outline-1 outline-offset-0 outline-gray-700"
        //     >
        //         <div className="">Remaining Expenses Total</div>
        //         <div className="">{
        //             `${selectedDate} - ${payweekCalendarEndDate}`
        //         }</div>
        //     </div>
        //     <div
        //         id="remainder"
        //         className="col-span-1 row-span-2 content-center bg-gray-850 text-center outline outline-1 outline-offset-0 outline-gray-700"
        //     >
        //         <p className="bg-clip-text text-transparent bg-gradient-to-r from-rose-700 to-rose-200 text-4xl font-bold">
        //             {incomeAmount
        //                 ? `${"$" + (selectedExpenseAmount).toFixed(2)}`
        //                 : `${"$" + "0.00"}`}
        //         </p>
        //     </div>
        //     <div
        //         id="e"
        //         className="col-span-1 row-span-1 flex flex-row items-center justify-between bg-gray-900 px-2 text-gray-400 outline outline-1 outline-offset-0 outline-gray-700"
        //     >
        //         <div className="">Current Pay Period</div>
        //         <div className="">{`$${(expenseAmount).toFixed(2)}`}</div>
        //     </div>
        //     <div
        //         id="f"
        //         className="col-span-1 row-span-5 content-center bg-gray-900 px-2 outline outline-1 outline-offset-0 outline-gray-700"
        //     >
        //         <PaycheckCalendar
        //             date={date}
        //             calendarRows={payweekCalendarRows}
        //             selectedDate={selectedDate}
        //             setSelectedDate={setSelectedDate}
        //         />
        //     </div>
        //     <div
        //         id="selected_date_expenses"
        //         className="col-span-1 row-span-1 flex flex-row content-center items-center justify-between bg-gray-900 px-2 text-gray-400 outline outline-1 outline-offset-0 outline-gray-700"
        //     >
        //         <div className="">Selected Date Expenses</div>
        //         <div className="">{`$${getSelectedDateExpenseTotal(selectedDateExpenses)}`}</div>
        //     </div>
        //     <div
        //         id="h"
        //         className="col-span-1 row-span-14 max-h-108 overflow-y-scroll content-start bg-gray-900 px-4 py-4 text-gray-400 outline outline-1 outline-offset-0 outline-gray-700"
        //     >
        //         {selectedDate ? (
        //             <div className="pb-2 text-gray-600">Payments on the {AddDueDateSuffix(selectedDate)}</div>
        //         ) : (
        //             <></>
        //         )}
        //         {selectedDateExpenses.map((dateExpense) => (
        //             <PaycheckCalendarPaymentInfo
        //                 key={dateExpense.id}
        //                 weekday={dateExpense.expense_due_date}
        //                 amount={dateExpense.expense_amount}
        //                 expense={dateExpense.expense_name}
        //             />
        //         ))}
        //     </div>
        // </div>
    );
}
