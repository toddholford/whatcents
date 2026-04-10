import React from "react";
import { CalculatorIcon } from "@heroicons/react/24/outline";
import { CustomNumberInput } from "../CustomNumberInput";
import { CustomDropdown } from "../CustomDropDown";
import { CustomDateInput } from "../CustomDateInput";
import { toast, ToastContainer } from "react-toastify";
import { RepeatingExpenses } from "../RepeatingExpenses";
import { addPaycheckInfo, getIds, updatePaycheckInfo } from "../../services/PaycheckInfoService";
import { usePaycheckStore } from "../../store/usePaycheckStore";
import { useUIStore } from "../../store/useUIStore";
import { useMediaQuery } from "../../hooks/useMediaQuery";

interface FormColumnProps {
  startDate: string;
  setDate: (date: Date) => void;
  expenseAmount: number;
}

export const FormColumn = ({ startDate, setDate, expenseAmount }: FormColumnProps) => {
  const isDesktop = useMediaQuery("(min-width: 1124px)");

  const {
    userUUID,
    incomeAmount,
    setIncomeAmount,
    payFrequency,
    setPayFrequency,
    payFrequencies,
    repeatingExpenses,
    setRepeatingExpenses,
    repeatingExpenseTotal,
    setRepeatingExpenseTotal,
    ids,
    setIds,
  } = usePaycheckStore();

  const { calculatorOpen, setCalculatorOpen } = useUIStore();

  const savePaycheckInfo = async () => {
    await getIds(setIds);
    if (ids.includes(userUUID!)) {
      await updatePaycheckInfo(
        userUUID!,
        incomeAmount,
        payFrequency,
        repeatingExpenses,
        setIncomeAmount,
        setPayFrequency,
        setRepeatingExpenses,
      );
    } else {
      await addPaycheckInfo(
        userUUID!,
        incomeAmount,
        payFrequency,
        repeatingExpenses,
        setIncomeAmount,
        setPayFrequency,
        setRepeatingExpenses,
      );
    }
    toast("Saved calculation values");
  };

  return (
    <div
      id="left"
      className="min-h-screen col-span-3 row-span-full grid grid-flow-row grid-rows-24 bg-gray-900 outline outline-1 outline-offset-0 outline-gray-700"
    >
      <div className="col-span-1 row-span-1 flex flex-row items-center justify-between bg-gray-900 px-2 text-gray-400 outline outline-1 outline-offset-0 outline-gray-700">
        <div>Remainder</div>
        {isDesktop && (
          <button
            aria-label="Toggle calculator"
            className="cursor-pointer text-emerald-700 hover:text-emerald-500 active:text-emerald-300"
            onMouseDown={() => setCalculatorOpen(!calculatorOpen)}
          >
            <CalculatorIcon className="h-6 w-6" />
          </button>
        )}
      </div>

      <div className="col-span-1 row-span-2 content-center bg-gray-850 text-center outline outline-1 outline-offset-0 outline-gray-700">
        <p className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-emerald-200 text-4xl font-bold">
          {incomeAmount
            ? `$${(incomeAmount - (expenseAmount + repeatingExpenseTotal)).toFixed(2)}`
            : "$0.00"}
        </p>
      </div>

      <div className="col-span-1 content-center bg-gray-900 px-2 text-gray-400 outline outline-1 outline-offset-0 outline-gray-700">
        Calculate Remainder
      </div>

      <div className="col-span-1 row-span-5 bg-gray-900 px-16 py-4 text-center outline outline-1 outline-offset-0 outline-gray-700">
        <CustomNumberInput
          id="current_avg_income"
          inputValue={incomeAmount}
          setInputValue={setIncomeAmount}
          numberType="decimal"
          adjustBy="100"
          placeholder="Current Average Income"
          customClassNames="pb-2"
        />
        <CustomDropdown
          options={payFrequencies}
          selected={payFrequency}
          onSelect={(value) => setPayFrequency(value)}
          placeholder="Select Pay Period"
          customClassNames="pb-2"
        />
        <CustomDateInput
          startDate={startDate}
          setDate={setDate}
          customClassNames=""
        />
        <button
          type="button"
          onMouseDown={savePaycheckInfo}
          className="mt-4 h-8 w-4/12 rounded-sm bg-emerald-950 text-center text-sm outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-900 hover:outline-emerald-600 active:bg-emerald-800"
        >
          Save
        </button>
        <ToastContainer
          toastClassName="bg-emerald-950 text-center rounded-sm text-sm outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-900 hover:outline-emerald-600 active:bg-emerald-800"
          icon={false}
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>

      <div className="col-span-1 row-span-1 flex flex-row items-center justify-between bg-gray-900 px-2 text-gray-400 outline outline-1 outline-offset-0 outline-gray-700">
        <div>Repeating Expenses</div>
        <div>{`$${repeatingExpenseTotal.toFixed(2)}`}</div>
      </div>

      <div className="col-span-1 row-span-14 max-h-108 overflow-y-scroll bg-gray-900 px-14 py-4 text-center outline outline-1 outline-offset-0 outline-gray-700">
        <RepeatingExpenses />
      </div>
    </div>
  );
};
