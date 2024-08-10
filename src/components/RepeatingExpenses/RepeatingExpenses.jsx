import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { CustomNumberInput } from "../CustomNumberInput";
import {
  addPerPaycheckExpense,
  getPerPaycheckExpenses,
  updatePerPaycheckExpenses,
} from "../../services/PaycheckInfoService";
import supabase from "../../config/supabaseClient";
import { addPayment } from "../../services/PaymentsService";

export const RepeatingExpenses = ({
  userUUID,
  repeatingExpenses,
  setRepeatingExpenses,
  repeatingExpenseTotal,
  setRepeatingExpenseTotal,
  setFetchError,
}) => {
  const [addNewRepeatingExpense, setAddNewRepeatingExpense] = useState(false);
  const [repeatingExpenseName, setRepeatingExpenseName] = useState("");
  const [repeatingExpenseAmount, setRepeatingExpenseAmount] = useState(0);

  const addRepeatingExpense = (
    userId,
    expenses,
    expenseName,
    expenseAmount,
  ) => {
    if (!expenseName || !expenseAmount || expenseName === "") {
      return;
    }
    expenses[expenseName] = expenseAmount;
    updatePerPaycheckExpenses(
      userId,
      expenses,
      setRepeatingExpenses,
      setFetchError,
    );
  };

  const deleteRepeatingExpense = (userId, expenses, expenseName) => {
    delete expenses[expenseName];
    updatePerPaycheckExpenses(
      userId,
      expenses,
      setRepeatingExpenses,
      setFetchError,
    );
  };

  useEffect(() => {
    getPerPaycheckExpenses(setRepeatingExpenses, setFetchError);
  }, []);

  // useEffect(() => {
  //   updatePerPaycheckExpenses(
  //     userUUID,
  //     repeatingExpenses,
  //     setRepeatingExpenses,
  //     setFetchError,
  //   );
  // }, []);

  useEffect(() => {
    let total = 0;
    for (const expenseName in repeatingExpenses) {
      total += Number(repeatingExpenses[expenseName]);
    }
    setRepeatingExpenseTotal(total);
  }, [repeatingExpenses]);

  return (
    <div>
      <button
        type="button"
        onClick={() => setAddNewRepeatingExpense(!addNewRepeatingExpense)}
        className="flex h-8 w-full items-center justify-center rounded-sm bg-gray-800 text-center text-sm outline outline-1 outline-offset-0 outline-gray-600 hover:bg-gray-700"
      >
        <PlusIcon className="h-1/2 w-1/2" />
      </button>
      <form>
        {addNewRepeatingExpense ? (
          <div className="fixed z-10 -ml-0.5 mt-2 w-58 rounded border border-solid border-gray-700 bg-gray-900 p-2 text-center text-sm">
            <p className="my-2 text-left text-sm font-thin text-gray-600">
              Name
            </p>
            <input
              type="text"
              id="repeating_expense_name"
              className="block h-8 w-full rounded-sm bg-gray-850 pl-2 outline outline-1 outline-offset-0 outline-gray-700"
              onChange={(e) => {
                setRepeatingExpenseName(e.target.value);
              }}
            />
            <p className="my-2 text-left text-sm font-thin text-gray-600">
              Amount
            </p>
            <input
              type="number"
              id="repeating_expense_amount"
              className="block h-8 w-full rounded-sm bg-gray-850 pl-2 outline outline-1 outline-offset-0 outline-gray-700"
              onChange={(e) => {
                setRepeatingExpenseAmount(parseFloat(e.target.value));
              }}
            />
            <button
              type="submit"
              onMouseDown={() => {
                addRepeatingExpense(
                  userUUID,
                  repeatingExpenses,
                  repeatingExpenseName,
                  repeatingExpenseAmount,
                );
                setAddNewRepeatingExpense(false);
              }}
              className="mt-2 w-1/3 rounded-sm bg-gray-800 py-2 outline outline-1 outline-offset-0 outline-gray-600 hover:bg-gray-700"
            >
              Add
            </button>
          </div>
        ) : null}
        {repeatingExpenses
          ? Object.entries(repeatingExpenses).map(([key, value]) => (
              <div
                key={key}
                className="border-b border-solid border-gray-700 p-2 pb-5"
              >
                <div className="flex items-center justify-between">
                  <p className="my-2 text-left text-sm font-thin text-gray-600">
                    {key}
                  </p>
                  <button
                    type="submit"
                    onMouseDown={() =>
                      deleteRepeatingExpense(userUUID, repeatingExpenses, key)
                    }
                    className="h-1/12 w-1/12 scale-75 cursor-pointer text-gray-600 hover:text-white"
                  >
                    <XMarkIcon />
                  </button>
                </div>

                <CustomNumberInput defaultValue={value} />
              </div>
            ))
          : null}
      </form>
    </div>
  );
};
