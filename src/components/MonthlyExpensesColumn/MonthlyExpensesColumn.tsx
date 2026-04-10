import React, { useState } from "react";
import { getAllPaymentsTotal } from "../../helpers/payweekHelpers";
import { CustomNumberInput } from "../CustomNumberInput";
import { PaymentsPage } from "../../pages/Payments";
import { addPayment } from "../../services/PaymentsService";
import { usePaymentsStore } from "../../store/usePaymentsStore";

export const MonthlyExpensesColumn = () => {
  const { payments, addPayment: addToStore } = usePaymentsStore();
  const [expenseName, setExpenseName] = useState("");
  const [paymentExpenseAmount, setPaymentExpenseAmount] = useState(0);
  const [expenseDueDate, setExpenseDueDate] = useState(0);

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenseName || !paymentExpenseAmount || !expenseDueDate) return;

    addPayment(
      expenseName,
      paymentExpenseAmount,
      expenseDueDate,
      setExpenseName,
      setPaymentExpenseAmount,
      setExpenseDueDate,
      addToStore,
    );
  };

  return (
    <div
      id="right"
      className="min-h-screen col-span-5 row-span-full grid grid-flow-row grid-rows-24 bg-gray-900 outline outline-1 outline-offset-0 outline-gray-700"
    >
      <div className="col-span-1 row-span-1 flex flex-row content-center items-center justify-between bg-gray-900 px-2 text-gray-400 outline outline-1 outline-offset-0 outline-gray-700">
        <p>Reoccurring Monthly Expenses</p>
        <p>{`$${getAllPaymentsTotal(payments)}`}</p>
      </div>

      <div className="col-span-1 row-span-2 flex flex-row content-center items-center justify-evenly bg-gray-900 px-2 text-gray-400 outline outline-1 outline-offset-0 outline-gray-700">
        <form
          onSubmit={handlePaymentSubmit}
          className="col-span-full row-span-1 flex flex-row items-center justify-center gap-4"
        >
          <div>
            <input
              placeholder="Name of Expense..."
              type="text"
              id="expense_name"
              className="block w-full h-8 rounded-sm bg-gray-850 pl-2 text-xs outline outline-1 outline-offset-0 outline-gray-700"
              onChange={(e) => setExpenseName(e.target.value)}
              value={expenseName}
              aria-label="Expense name"
            />
          </div>
          <div>
            <CustomNumberInput
              placeholder="Expense Amount..."
              id="expense_amount"
              numberType="decimal"
              adjustBy="10"
              inputValue={paymentExpenseAmount}
              setInputValue={setPaymentExpenseAmount}
            />
          </div>
          <div>
            <CustomNumberInput
              placeholder="Expense Due Date..."
              id="expense_due_date"
              inputValue={expenseDueDate}
              setInputValue={setExpenseDueDate}
            />
          </div>
          <button
            type="submit"
            className="h-8 w-1/12 rounded-sm bg-emerald-950 text-center text-sm outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-900 hover:outline-emerald-600 active:bg-emerald-800"
          >
            Add
          </button>
        </form>
      </div>

      <div className="col-span-1 row-span-20 bg-gray-900">
        <PaymentsPage />
      </div>
    </div>
  );
};
