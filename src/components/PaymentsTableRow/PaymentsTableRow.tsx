import React, { useState } from "react";
import { addCurrencyZeroes } from "../../helpers/numberFormatHelper";
import { AddDueDateSuffix } from "../../helpers/dateHelpers";
import { editPaymentRow } from "../../services/PaymentsService";
import { CustomNumberInput } from "../CustomNumberInput";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import type { Payment } from "../../types";

interface PaymentsTableRowProps {
  payment: Payment;
  onDelete: () => void;
}

export const PaymentsTableRow = ({ payment, onDelete }: PaymentsTableRowProps) => {
  const [expenseName, setExpenseName] = useState(payment.expense_name);
  const [expenseAmount, setExpenseAmount] = useState(payment.expense_amount);
  const [expenseDueDate, setExpenseDueDate] = useState(payment.expense_due_date);
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    editPaymentRow(payment.id, expenseName, expenseAmount, expenseDueDate);
    setEditing(false);
  };

  function shortenName(name: string) {
    return name.length > 12 ? `${name.substring(0, 12)}...` : name;
  }

  return (
    <tr className="flex w-full items-center border-b border-gray-700 bg-gray-900">
      {editing ? (
        <>
          <th scope="row" className="w-1/4 whitespace-nowrap p-4 text-sm font-medium text-gray-200">
            <input
              type="text"
              defaultValue={payment.expense_name}
              onChange={(e) => setExpenseName(e.target.value)}
              aria-label="Edit expense name"
              className="block h-8 w-full rounded-sm bg-gray-850 pl-2 outline outline-1 outline-offset-0 outline-gray-700"
            />
          </th>
          <td className="w-1/4 p-4">
            <CustomNumberInput
              defaultValue={payment.expense_amount}
              setInputValue={setExpenseAmount}
            />
          </td>
          <td className="w-1/4 p-4 ordinal">
            <CustomNumberInput
              defaultValue={payment.expense_due_date}
              setInputValue={setExpenseDueDate}
            />
          </td>
          <td className="w-1/4 p-4">
            <button
              type="button"
              onClick={handleSave}
              className="ml-2 w-1/3 rounded-sm bg-gray-800 py-2 outline outline-1 outline-offset-0 outline-gray-600 hover:bg-gray-700"
            >
              Save
            </button>
          </td>
        </>
      ) : (
        <>
          <th scope="row" className="w-1/4 whitespace-nowrap p-4 text-sm font-medium text-gray-200">
            <div title={payment.expense_name}>{shortenName(expenseName)}</div>
          </th>
          <td className="w-1/4 p-4">{addCurrencyZeroes(payment.expense_amount)}</td>
          <td className="w-1/4 p-4 ordinal">{AddDueDateSuffix(payment.expense_due_date)}</td>
          <td className="w-1/4 flex items-center justify-center">
            <div className="inline-flex rounded-sm shadow-sm" role="group">
              <button
                onClick={() => setEditing(true)}
                type="button"
                aria-label="Edit payment"
                className="hover:text-emerald-500 px-2 py-1 bg-gray-800 border border-gray-600 rounded-s-sm hover:bg-gray-700"
              >
                <PencilSquareIcon className="h-6 w-6 scale-75" />
              </button>
              <button
                onClick={onDelete}
                type="button"
                aria-label="Delete payment"
                className="hover:text-emerald-500 px-2 py-1 bg-gray-800 border border-gray-600 rounded-e-sm hover:bg-gray-700"
              >
                <TrashIcon className="h-6 w-6 scale-75" />
              </button>
            </div>
          </td>
        </>
      )}
    </tr>
  );
};
