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

  return (
    <article className="col-span-1 row-span-full grid h-screen grid-cols-12 grid-rows-12 bg-gray-900">

      <div className="col-span-full row-span-11 pb-10">
        <table className="h-full w-full text-center text-sm text-white">
          <thead className="bg-gray-900 text-xs uppercase text-gray-500 outline outline-1 outline-offset-0 outline-gray-700">
            <tr className="flex w-full items-center justify-evenly">
              <th scope="col" className="w-1/4 p-2">
                Expense
              </th>
              <th scope="col" className="w-1/4 p-2 flex items-center justify-center">
                <span>Amount</span>
                {/*<SortButton column="amount" sortOrder={sortStates["amount"]} onSort={handlePaymentSort} />*/}
              </th>
              <th scope="col" className="w-1/4 p-2 flex items-center justify-center">
                <span>Due Date</span>
                {/*<SortButton column="dueDate" sortOrder={sortStates["dueDate"]} onSort={handlePaymentSort} />*/}
              </th>
              <th scope="col" className="w-1/4 p-2"></th>
            </tr>
          </thead>
          <tbody className="flex h-97pc flex-col items-center overflow-y-scroll">
            {fetchError && <p>{fetchError}</p>}
            {payments &&
              payments.map((payment) => (
                <PaymentsTableRow
                  key={payment.id}
                  payment={payment}
                  onDelete={() => handlePaymentDelete(payment.id)}
                />
              ))}
          </tbody>
        </table>
      </div>
    </article>
  );
};
