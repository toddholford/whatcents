import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { PaycheckCalendarPaymentInfo } from "../../components/PaycheckCalendarPaymentInfo";
import { PaycheckCalendar } from "../../components/PaycheckCalendar";
import { CustomNumberInput } from "../../components/CustomNumberInput";
import {addPayment, getAllPayments} from "../../services/PaymentsService";
import { getPaycheckFrequencies } from "../../services/PaycheckFrequenciesService";
import { getPaycheckCalculations } from "../../services/PaycheckCalculationsService";
import { PaymentsPage } from "../Payments";
import { CustomDropdown } from "../../components/CustomDropDown";
import { CustomDateInput } from "../../components/CustomDateInput";
import { toast, ToastContainer } from "react-toastify";
import { RepeatingExpenses } from "../../components/RepeatingExpenses";
import supabase from "../../config/supabaseClient";
import {
  getCorrectDate,
  formatDate,
  AddDueDateSuffix,
} from "../../helpers/dateHelpers";
import {
  getAllPaymentsTotal,
  getPayweekCalendarRows,
  getPayweekDates,
  getPayweekExpenseTotal,
  getPayweekRemainingAmount,
  getSelectedDateExpenses,
  getSelectedDateExpenseTotal, getSelectedPayweekExpenseTotal,
} from "../../helpers/payweekHelpers";
import {
  addPaycheckInfo,
  getId,
  getIds,
  getIncomeAmount,
  getPaycheckFrequency,
  updatePaycheckInfo,
} from "../../services/PaycheckInfoService";
import { getUserUUID } from "../../services/UsersService";
import { CalculatorIcon } from "@heroicons/react/24/outline";
import { Calculator } from "../../components/Calculator";
import {Helmet} from "react-helmet-async";

export const DashboardPage = () => {
  const [date, setDate] = useState(
    getCorrectDate(new Date().toLocaleDateString()),
  );
  const [startDate, setStartDate] = useState("");
  const [payweekDates, setPayweekDates] = useState(null);
  const [incomeAmount, setIncomeAmount] = useState(0);
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [selectedExpenseAmount, setSelectedExpenseAmount] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [repeatingExpenses, setRepeatingExpenses] = useState({});
  const [repeatingExpenseTotal, setRepeatingExpenseTotal] = useState(0);
  const [payFrequency, setPayFrequency] = useState(null);
  const [payFrequencies, setPayFrequencies] = useState([]);
  const [payweekCalendarRows, setPayweekCalendarRows] = useState(null);
  const [payweekCalendarEndDate, setPayweekCalendarEndDate] = useState(null);
  const [payments, setPayments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateExpenses, setSelectedDateExpenses] = useState([]);
  const [paycheckCalculations, setPaycheckCalculations] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [userUUID, setUserUUID] = useState(null);
  const [ids, setIds] = useState([]);
  const [calculatorOpen, setCalculatorOpen] = useState(false);

  const [expenseName, setExpenseName] = useState("");
  const [paymentExpenseAmount, setPaymentExpenseAmount] = useState(0);
  const [expenseDueDate, setExpenseDueDate] = useState(0);

  const notify = () => toast("Saved calculation values");

  //get payments
  useEffect(() => {
    getAllPayments(setPayments, setFetchError);
  }, []);
  //get paycheck frequencies
  useEffect(() => {
    getPaycheckFrequencies(setPayFrequencies, setFetchError);
  }, []);
  //get paycheck calculations
  useEffect(() => {
    getPaycheckCalculations(setPaycheckCalculations, setFetchError);
  }, []);
  //get user income
  useEffect(() => {
    getIncomeAmount(setIncomeAmount, setFetchError);
  }, []);
  //get user paycheck frequency
  useEffect(() => {
    getPaycheckFrequency(setPayFrequency, setFetchError);
  }, []);
  //get user uuid
  useEffect(() => {
    getUserUUID(setUserUUID);
  }, []);
  //get user ids
  useEffect(() => {
    getIds(setIds, setFetchError);
  }, []);

  //date setter
  useEffect(() => {
    setStartDate(formatDate(date));
    setPayweekDates(getPayweekDates(date));
  }, [date]);

  //amount setter
  useEffect(() => {
    setExpenseAmount(
      getPayweekExpenseTotal(
        payweekDates,
        repeatingExpenseTotal,
        date,
        payments,
      ),
    );
    setRemainingAmount(getPayweekRemainingAmount(incomeAmount, expenseAmount));
  }, [payweekDates, incomeAmount, repeatingExpenseTotal, payments]);

  useEffect(() => {
    setSelectedExpenseAmount(
      getSelectedPayweekExpenseTotal(
        payweekDates,
        repeatingExpenseTotal,
        date,
        payments,
        selectedDate,
      ),
    );
  }, [payweekDates, incomeAmount, repeatingExpenseTotal, payments, selectedDate]);

  //calendar setter
  useEffect(() => {
    setPayweekCalendarRows(getPayweekCalendarRows(payweekDates, payFrequency));
  }, [payweekDates, payFrequency]);

  useEffect(() => {
    if (payFrequency === "bi-weekly") {
      setPayweekCalendarEndDate(payweekCalendarRows[1][payweekCalendarRows[1].length - 1]);
    }
  }, [payweekCalendarRows]);

  //selected date expenses setter
  useEffect(() => {
    setSelectedDateExpenses(
      getSelectedDateExpenses(selectedDate, payweekDates, date, payments),
    );
  }, [selectedDate]);

  const savePaycheckInfo = () => {
    getIds(setIds, setFetchError);
    if (ids.includes(userUUID)) {
      console.log("save paycheck info - try update");
      updatePaycheckInfo(
        userUUID,
        incomeAmount,
        payFrequency,
        repeatingExpenses,
        fetchError,
        setIncomeAmount,
        setPayFrequency,
        setFetchError,
      );
    } else {
      console.log("save paycheck info - try add");
      addPaycheckInfo(
        userUUID,
        incomeAmount,
        payFrequency,
        repeatingExpenses,
        fetchError,
        setIncomeAmount,
        setPayFrequency,
        setFetchError,
      );
    }
    notify();
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    if (!expenseName || !paymentExpenseAmount || !expenseDueDate) {
      return;
    }

    addPayment(
        expenseName,
        paymentExpenseAmount,
        expenseDueDate,
        setExpenseName,
        setPaymentExpenseAmount,
        setExpenseDueDate,
        setPayments,
        setFetchError,
    );
  };

  const toggleCalculator = () => {
    setCalculatorOpen(!calculatorOpen);
    console.log("open calculator after : ", calculatorOpen);
  };

  return (
    <>
      {calculatorOpen ? (
        <Calculator setCalculatorOpen={setCalculatorOpen} />
      ) : null}
      <div className="grid grid-cols-24">
        <Navbar />
        <article
          id="main-content"
          className="gap-2 col-span-23 row-span-full grid grid-cols-12 grid-rows-4 bg-gray-950 outline outline-1 outline-offset-0 outline-gray-700"
        >
          <article
            id="left"
            className="col-span-3 row-span-full grid grid-flow-row grid-rows-24 bg-gray-900 outline outline-1 outline-offset-0 outline-gray-700"
          >
            <article
              id="a"
              className="col-span-1 row-span-1 flex flex-row items-center justify-between bg-gray-900 px-2 text-gray-400 outline outline-1 outline-offset-0 outline-gray-700"
            >
              <div className="">Remainder</div>
              <div
                className="cursor-pointer text-emerald-700 hover:text-emerald-500 active:text-emerald-300"
                onMouseDown={toggleCalculator}
              >
                <CalculatorIcon className="h-6 w-6" />
              </div>
            </article>
            <article
              id="remainder"
              className="col-span-1 row-span-2 content-center bg-gray-850 text-center outline outline-1 outline-offset-0 outline-gray-700"
            >
              <p className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-emerald-200 text-4xl font-bold">
                {incomeAmount
                  ? `${"$" + (incomeAmount - (expenseAmount + repeatingExpenseTotal)).toFixed(2)}`
                  : `${"$" + "0.00"}`}
              </p>
            </article>
            <article
              id="c"
              className="col-span-1 content-center bg-gray-900 px-2 text-gray-400 outline outline-1 outline-offset-0 outline-gray-700"
            >
              Calculate Remainder
            </article>
            <article
              id="d"
              className="col-span-1 row-span-5 bg-gray-900 px-16 py-4 text-center outline outline-1 outline-offset-0 outline-gray-700"
            >
              <CustomNumberInput
                id="current_avg_income"
                inputValue={incomeAmount}
                setInputValue={setIncomeAmount}
                numberType="decimal"
                adjustBy="100"
                placeholder="Current Average Income"
                customClassNames="pb-2"
              ></CustomNumberInput>
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
            </article>
            <article
              id="e"
              className="col-span-1 row-span-1 flex flex-row items-center justify-between bg-gray-900 px-2 text-gray-400 outline outline-1 outline-offset-0 outline-gray-700"
            >
              <div className="">Repeating Expenses</div>
              <div className="">{`$${repeatingExpenseTotal.toFixed(2)}`}</div>
            </article>
            <article
              id="d"
              className="col-span-1 row-span-14 max-h-108 overflow-y-scroll bg-gray-900 px-14 py-4 text-center outline outline-1 outline-offset-0 outline-gray-700"
            >
              <RepeatingExpenses
                userUUID={userUUID}
                repeatingExpenses={repeatingExpenses}
                setRepeatingExpenses={setRepeatingExpenses}
                repeatingExpenseTotal={repeatingExpenseTotal}
                setRepeatingExpenseTotal={setRepeatingExpenseTotal}
                setFetchError={setFetchError}
              />
            </article>
          </article>
          <article
            id="center"
            className="col-span-4 row-span-full grid grid-flow-row grid-rows-24 bg-gray-900 outline outline-1 outline-offset-0 outline-gray-700"
          >
            <article
                id="remaining_expenses_total"
                className="col-span-1 row-span-1 flex flex-row content-center items-center justify-between bg-gray-900 px-2 text-gray-400 outline outline-1 outline-offset-0 outline-gray-700"
            >
              <div className="">Remaining Expenses Total</div>
              <div className="">{
                `${selectedDate} - ${payweekCalendarEndDate}`
              }</div>
            </article>
            <article
                id="remainder"
                className="col-span-1 row-span-2 content-center bg-gray-850 text-center outline outline-1 outline-offset-0 outline-gray-700"
            >
              <p className="bg-clip-text text-transparent bg-gradient-to-r from-rose-700 to-rose-200 text-4xl font-bold">
                {incomeAmount
                    ? `${"$" + (selectedExpenseAmount).toFixed(2)}`
                    : `${"$" + "0.00"}`}
              </p>
            </article>
            <article
              id="e"
              className="col-span-1 row-span-1 flex flex-row items-center justify-between bg-gray-900 px-2 text-gray-400 outline outline-1 outline-offset-0 outline-gray-700"
            >
              <div className="">Current Pay Period</div>
              <div className="">{`$${(expenseAmount).toFixed(2)}`}</div>
            </article>
            <article
              id="f"
              className="col-span-1 row-span-5 content-center bg-gray-900 px-2 outline outline-1 outline-offset-0 outline-gray-700"
            >
              <PaycheckCalendar
                date={date}
                calendarRows={payweekCalendarRows}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            </article>
            <article
              id="selected_date_expenses"
              className="col-span-1 row-span-1 flex flex-row content-center items-center justify-between bg-gray-900 px-2 text-gray-400 outline outline-1 outline-offset-0 outline-gray-700"
            >
              <div className="">Selected Date Expenses</div>
              <div className="">{`$${getSelectedDateExpenseTotal(selectedDateExpenses)}`}</div>
            </article>
            <article
              id="h"
              className="col-span-1 row-span-14 max-h-108 overflow-y-scroll content-start bg-gray-900 px-4 py-4 text-gray-400 outline outline-1 outline-offset-0 outline-gray-700"
            >
              <div className="pb-2 text-gray-600">
                {selectedDate ? (
                  <>Payments on the {AddDueDateSuffix(selectedDate)}</>
                ) : (
                  <></>
                )}
              </div>
              <div className="">
                {selectedDateExpenses.map((dateExpense) => (
                  <PaycheckCalendarPaymentInfo
                    key={dateExpense.id}
                    weekday={dateExpense.expense_due_date}
                    amount={dateExpense.expense_amount}
                    expense={dateExpense.expense_name}
                  />
                ))}
              </div>
            </article>
          </article>
          <article
            id="right"
            className="col-span-5 row-span-full grid grid-flow-row grid-rows-24 bg-gray-900 outline outline-1 outline-offset-0 outline-gray-700"
          >
            <article
              id="h"
              className="col-span-1 row-span-1 flex flex-row content-center items-center justify-between bg-gray-900 px-2 text-gray-400 outline outline-1 outline-offset-0 outline-gray-700"
            >
              <p className="">Reoccurring Monthly Expenses</p>
              <p className="">{`$${getAllPaymentsTotal(payments)}`}</p>
            </article>
            <article id="h2" className="col-span-1 row-span-2 flex flex-row content-center items-center justify-evenly bg-gray-900 px-2 text-gray-400 outline outline-1 outline-offset-0 outline-gray-700">
              <form
                  onSubmit={handlePaymentSubmit}
                  className="col-span-full row-span-1 flex flex-row items-center justify-center gap-4"
              >
                <div>
                  <input
                      placeholder="Name of Expense..."
                      type="text"
                      id="expense_name"
                      className="block h-8 w-full rounded-sm bg-gray-850 pl-2 text-xs outline outline-1 outline-offset-0 outline-gray-700"
                      onChange={(e) => {
                        setExpenseName(e.target.value);
                      }}
                      value={expenseName || ""}
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
            </article>
            <article
              id="i"
              className="col-span-1 row-span-20 bg-gray-900 outline outline-1 outline-offset-0 outline-gray-700"
            >
              <PaymentsPage
                payments={payments}
                setPayments={setPayments}
                fetchError={fetchError}
                setFetchError={setFetchError}
              />
            </article>
          </article>
        </article>
      </div>
    </>
  );
};
