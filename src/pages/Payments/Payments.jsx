import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { CustomNumberInput } from "../../components/CustomNumberInput";
import { PaymentsTableRow } from "../../components/PaymentsTableRow";
import {
  addPayment,
  deletePaymentRow,
  getAllPayments,
} from "../../services/PaymentsService";
import {Bars2Icon, ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/24/outline";
import {SortButton} from "../../components/SortButton";

export const PaymentsPage = ({ payments, setPayments, fetchError, setFetchError }) => {
  // const [fetchError, setFetchError] = useState(null);

  // const [expenseName, setExpenseName] = useState("");
  // const [expenseAmount, setExpenseAmount] = useState(0);
  // const [expenseDueDate, setExpenseDueDate] = useState(0);

  const [sortStates, setSortStates] = useState({});

  const handlePaymentSort = (column) => {
    setSortStates((prevStates) => {
      const currentOrder = prevStates[column] || 'default';
      const newOrder =
          currentOrder === 'default'
              ? 'ascending'
              : currentOrder === 'ascending'
                  ? 'descending'
                  : 'default';
      return {
        ...prevStates,
        [column]: newOrder,
      };
    });
  };

  const handlePaymentDelete = (id) => {
    deletePaymentRow(id, setPayments);
  };

  function getTableBodyClasses() {
    if (window.innerWidth < window.innerHeight ) {
      return "w-full overflow-y-auto overflow-x-hidden h-[calc(100vh-15rem)]";
    }

    return "w-full overflow-y-auto overflow-x-hidden h-[calc(100vh-11rem)]";
  }

  return (
    <article className="col-span-1 row-span-full grid h-screen grid-cols-12 grid-rows-12 bg-gray-900">

      <div className="col-span-full row-span-11 pb-10">
        {/* Table Header */}
        <div className="w-full">
          <table className="w-full text-sm text-white">
            <thead className="bg-gray-900 text-xs uppercase text-gray-500 outline outline-1 outline-gray-700">
            <tr>
              <th className="w-1/4 p-2">Expense</th>
              <th className="w-1/4 p-2">Amount</th>
              <th className="w-1/4 p-2">Due Date</th>
              <th className="w-1/4 p-2"></th>
            </tr>
            </thead>
          </table>
        </div>

        {/* Scrollable Table Body */}
        <div className={getTableBodyClasses()}>
          <table className="w-full text-sm text-white">
            <tbody className="text-center">
            {fetchError && (
                <tr>
                  <td colSpan="4" className="text-center p-4">{fetchError}</td>
                </tr>
            )}
            {payments?.map((payment) => (
                <PaymentsTableRow
                    key={payment.id}
                    payment={payment}
                    onDelete={() => handlePaymentDelete(payment.id)}
                />
            ))}
            </tbody>
          </table>
        </div>
      </div>

    </article>
  );
};
