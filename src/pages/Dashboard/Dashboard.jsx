import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { PaycheckCalendarPaymentInfo } from "../../components/PaycheckCalendarPaymentInfo";
import { PaycheckCalendar } from "../../components/PaycheckCalendar";
import {
  getCorrectDate,
  formatDate,
  AddDueDateSuffix,
} from "../../helpers/dateHelpers";
import {
  getPayweekCalendarRows,
  getPayweekDates,
  getPayweekExpenseTotal,
  getPayweekRemainingAmount,
  getSelectedDateExpenses,
} from "../../helpers/payweekHelpers";
import { CustomNumberInput } from "../../components/CustomNumberInput";
import { getAllPayments } from "../../services/PaymentsService";
import { getPaycheckFrequencies } from "../../services/PaycheckFrequenciesService";
import { getPaycheckCalculations } from "../../services/PaycheckCalculationsService";
import {
  getIncomeAmount,
  getPaycheckFrequency,
} from "../../services/PaycheckInfoService";
import { PaymentsPage } from "../Payments";
import { CustomDropdown } from "../../components/CustomDropDown";
import { CustomDateInput } from "../../components/CustomDateInput";
export const DashboardPage = () => {
  const [date, setDate] = useState(
    getCorrectDate(new Date().toLocaleDateString()),
  );
  const [startDate, setStartDate] = useState("");
  const [payweekDates, setPayweekDates] = useState(null);
  const [incomeAmount, setIncomeAmount] = useState(0);
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [repeatingExpenseAmount, setRepeatingExpenseAmount] = useState(0);
  const [payFrequency, setPayFrequency] = useState("Weekly");
  const [payFrequencies, setPayFrequencies] = useState([]);
  const [payweekCalendarRows, setPayweekCalendarRows] = useState(null);
  const [payments, setPayments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateExpenses, setSelectedDateExpenses] = useState([]);
  const [paycheckCalculations, setPaycheckCalculations] = useState([]);
  // const [selectedDate, setSelectedDate] = useState(getDefaultSelectedDate());
  // const [selectedDateExpenses, setSelectedDateExpenses] = useState(getSelectedDateExpenses());y
  const [fetchError, setFetchError] = useState(null);

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
        repeatingExpenseAmount,
        date,
        payments,
      ),
    );
    setRemainingAmount(getPayweekRemainingAmount(incomeAmount, expenseAmount));
  }, [payweekDates, incomeAmount, repeatingExpenseAmount, payments]);
  //calendar setter
  useEffect(() => {
    setPayweekCalendarRows(getPayweekCalendarRows(payweekDates, payFrequency));
  }, [payweekDates, payFrequency]);
  //selected date expenses setter
  useEffect(() => {
    setSelectedDateExpenses(
      getSelectedDateExpenses(selectedDate, payweekDates, date, payments),
    );
  }, [selectedDate]);
  //calculations setter
  // useEffect(() => {
  //     setPaycheckCalculations([payweekDates, payFrequency, selectedDate, payments]);
  // }, [payweekDates, payFrequency, selectedDate, payments]);

  return (
    <div className="grid h-screen grid-cols-24 overflow-hidden">
      <Navbar />
      <article
        id="main-content"
        className="col-span-23 row-span-full grid grid-cols-12 grid-rows-4 bg-gray-900 outline outline-1 outline-offset-0 outline-gray-700"
      >
        <article
          id="left"
          className="col-span-2 row-span-full grid grid-flow-row grid-rows-24 bg-gray-900 outline outline-1 outline-offset-0 outline-gray-700"
        >
          <article
            id="a"
            className="col-span-1 content-center bg-gray-900 px-2 text-gray-400 outline outline-1 outline-offset-0 outline-gray-700"
          >
            Remainder
          </article>
          <article
            id="b"
            className="col-span-1 row-span-2 content-center bg-gray-900 text-center outline outline-1 outline-offset-0 outline-gray-700"
          >
            <p className="text-2xl">
              {incomeAmount && expenseAmount
                ? `${"$" + (incomeAmount - expenseAmount).toFixed(2)}`
                : `${"$" + "0.00"}`}
            </p>
          </article>
          <article
            id="c"
            className="col-span-1 content-center bg-gray-900 px-2 text-gray-400 outline outline-1 outline-offset-0 outline-gray-700"
          >
            CalculateRemainder
          </article>
          <article
            id="d"
            className="col-span-1 row-span-20 bg-gray-900 px-4 py-4 text-center outline outline-1 outline-offset-0 outline-gray-700"
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
            <CustomNumberInput
              id="repeating_expense"
              inputValue={repeatingExpenseAmount}
              setInputValue={setRepeatingExpenseAmount}
              numberType="decimal"
              adjustBy="50"
              placeholder="Repeating Expenses"
              customClassNames="pb-2"
            ></CustomNumberInput>
            <CustomDropdown
              options={payFrequencies}
              selected={payFrequency}
              onSelect={(value) => setPayFrequency(value)}
              placeholder="Select Pay Frequency"
              customClassNames="pb-2"
            />
            <CustomDateInput
              startDate={startDate}
              setDate={setDate}
              customClassNames=""
            />
            <button
              type="submit"
              className="mt-4 h-8 w-4/12 rounded-sm bg-emerald-950 text-center text-sm outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-900 hover:outline-emerald-600 active:bg-emerald-800"
            >
              Calculate
            </button>
          </article>
        </article>
        <article
          id="center"
          className="col-span-4 row-span-full grid grid-flow-row grid-rows-24 bg-gray-900 outline outline-1 outline-offset-0 outline-gray-700"
        >
          <article
            id="e"
            className="col-span-1 row-span-1 content-center bg-gray-900 px-2 text-gray-400 outline outline-1 outline-offset-0 outline-gray-700"
          >
            Current Pay Period
          </article>
          <article
            id="f"
            className="col-span-1 row-span-8 content-center bg-gray-900 px-2 outline outline-1 outline-offset-0 outline-gray-700"
          >
            <PaycheckCalendar
              date={date}
              calendarRows={payweekCalendarRows}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </article>
          <article
            id="g"
            className="col-span-1 row-span-1 content-center bg-gray-900 px-2 text-gray-400 outline outline-1 outline-offset-0 outline-gray-700"
          >
            Selected Date Expenses
          </article>
          <article
            id="h"
            className="col-span-1 row-span-14 content-start bg-gray-900 px-4 py-4 text-gray-400 outline outline-1 outline-offset-0 outline-gray-700"
          >
            <div className="pb-2 text-gray-600">
              Payments on the {AddDueDateSuffix(selectedDate)}
            </div>
            <div>
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
          className="col-span-6 row-span-full grid grid-flow-row grid-rows-24 bg-gray-900 outline outline-1 outline-offset-0 outline-gray-700"
        >
          <article
            id="h"
            className="col-span-1 row-span-1 content-center bg-gray-900 px-2 text-gray-400 outline outline-1 outline-offset-0 outline-gray-700"
          >
            Monthly Expenses
          </article>
          <article
            id="i"
            className="col-span-1 row-span-23 bg-gray-900 outline outline-1 outline-offset-0 outline-gray-700"
          >
            <PaymentsPage />
          </article>
        </article>
      </article>
    </div>
  );
};
