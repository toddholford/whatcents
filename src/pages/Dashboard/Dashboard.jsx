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
import {FormColumn} from "../../components/FormColumn";
import {CalendarColumn} from "../../components/CalendarColumn";

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

  return (
    <>
      {calculatorOpen ? (
        <Calculator setCalculatorOpen={setCalculatorOpen} />
      ) : null}
      <div className="grid grid-cols-2 lg:grid-cols-24">
        <Navbar/>
        <article
          id="main-content"
          className="md:gap-2 md:col-span-23 md:row-span-full md:grid md:grid-cols-12 md:grid-rows-4 bg-gray-950"
        >
          <FormColumn
              userUUID={userUUID}
              repeatingExpenses={repeatingExpenses}
              setRepeatingExpenses={setRepeatingExpenses}
              setRepeatingExpenseTotal={setRepeatingExpenseTotal}
              startDate={startDate}
              setDate={setDate}
              calculatorOpen={calculatorOpen}
              setCalculatorOpen={setCalculatorOpen}
              incomeAmount={incomeAmount}
              setIncomeAmount={setIncomeAmount}
              expenseAmount={expenseAmount}
              repeatingExpenseTotal={repeatingExpenseTotal}
              payFrequency={payFrequency}
              setPayFrequency={setPayFrequency}
              payFrequencies={payFrequencies}
              ids={ids}
              setIds={setIds}
              fetchError={fetchError}
              setFetchError={setFetchError}
          />
          <CalendarColumn
              date={date}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              payweekCalendarEndDate={payweekCalendarEndDate}
              incomeAmount={incomeAmount}
              expenseAmount={expenseAmount}
              selectedExpenseAmount={selectedExpenseAmount}
              payweekCalendarRows={payweekCalendarRows}
              selectedDateExpenses={selectedDateExpenses}
          />

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
              className="col-span-1 row-span-20 bg-gray-900"
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
