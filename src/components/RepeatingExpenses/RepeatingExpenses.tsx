import React, { useEffect, useState } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { CustomNumberInput } from "../CustomNumberInput";
import {
  getPerPaycheckExpenses,
  updatePerPaycheckExpenses,
} from "../../services/PaycheckInfoService";
import { usePaycheckStore } from "../../store/usePaycheckStore";

export const RepeatingExpenses = () => {
  const {
    userUUID,
    repeatingExpenses,
    setRepeatingExpenses,
    setRepeatingExpenseTotal,
  } = usePaycheckStore();

  const [addingNew, setAddingNew] = useState(false);
  const [newName, setNewName] = useState("");
  const [newAmount, setNewAmount] = useState(0);

  useEffect(() => {
    getPerPaycheckExpenses(setRepeatingExpenses);
  }, []);

  useEffect(() => {
    const total = Object.values(repeatingExpenses).reduce(
      (sum, v) => sum + Number(v),
      0,
    );
    setRepeatingExpenseTotal(total);
  }, [repeatingExpenses]);

  const addExpense = () => {
    if (!newName || !newAmount) return;
    const updated = { ...repeatingExpenses, [newName]: newAmount };
    updatePerPaycheckExpenses(userUUID!, updated, setRepeatingExpenses);
    setNewName("");
    setNewAmount(0);
    setAddingNew(false);
  };

  const deleteExpense = (name: string) => {
    const updated = { ...repeatingExpenses };
    delete updated[name];
    updatePerPaycheckExpenses(userUUID!, updated, setRepeatingExpenses);
  };

  return (
    <div>
      <button
        type="button"
        aria-label="Add repeating expense"
        onClick={() => setAddingNew(!addingNew)}
        className="flex h-8 w-full items-center justify-center rounded-sm bg-gray-800 text-center text-sm outline outline-1 outline-offset-0 outline-gray-600 hover:bg-gray-700"
      >
        <PlusIcon className="h-1/2 w-1/2" />
      </button>

      {addingNew && (
        <div className="fixed z-10 mt-2 w-3/4 lg:w-1/5 rounded border border-solid border-gray-700 bg-gray-900 p-2 text-center text-sm">
          <p className="my-2 text-left text-sm font-thin text-gray-600">Name</p>
          <input
            type="text"
            aria-label="Expense name"
            className="block h-8 w-full rounded-sm bg-gray-850 pl-2 outline outline-1 outline-offset-0 outline-gray-700"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <p className="my-2 text-left text-sm font-thin text-gray-600">Amount</p>
          <input
            type="number"
            aria-label="Expense amount"
            className="block h-8 w-full rounded-sm bg-gray-850 pl-2 outline outline-1 outline-offset-0 outline-gray-700"
            onChange={(e) => setNewAmount(parseFloat(e.target.value))}
          />
          <button
            type="button"
            onMouseDown={addExpense}
            className="mt-2 w-1/3 rounded-sm bg-gray-800 py-2 outline outline-1 outline-offset-0 outline-gray-600 hover:bg-gray-700"
          >
            Add
          </button>
        </div>
      )}

      {Object.entries(repeatingExpenses).map(([name, value]) => (
        <div
          key={name}
          className="w-full border-b border-solid border-gray-700 p-2 pb-5"
        >
          <div className="flex items-center justify-between">
            <p className="my-2 text-left text-sm font-thin text-gray-600">{name}</p>
            <button
              type="button"
              aria-label={`Delete ${name}`}
              onMouseDown={() => deleteExpense(name)}
              className="h-1/12 w-1/12 scale-75 cursor-pointer text-gray-600 hover:text-white rounded-sm outline outline-1 outline-offset-0 outline-gray-700 hover:bg-gray-800 hover:outline-gray-600 active:bg-gray-700"
            >
              <XMarkIcon />
            </button>
          </div>
          <CustomNumberInput defaultValue={value} setInputValue={() => {}} />
        </div>
      ))}
    </div>
  );
};
